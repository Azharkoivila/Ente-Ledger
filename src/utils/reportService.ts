import database from "@/src/db/database";
import { Q } from "@nozbe/watermelondb";
import dayjs from "dayjs";

export default async function getReportService(dates) {
  // Start of the selected year
  const yearStart = dayjs(dates.start).startOf("year").valueOf();

  const [summary] = await database
    .get("transactions")
    .query(
      Q.unsafeSqlQuery(
        `
        SELECT

          -- Previous balance from start of year until before selected range
          COALESCE(
            SUM(
              CASE
                WHEN date >= ?
                 AND date < ?
                THEN CASE
                  WHEN txn_type = 'income' THEN amount
                  ELSE -amount
                END
                ELSE 0
              END
            ),
            0
          ) AS previous_balance,

          -- Income in selected range
          COALESCE(
            SUM(
              CASE
                WHEN date >= ?
                 AND date < ?
                 AND txn_type = 'income'
                THEN amount
                ELSE 0
              END
            ),
            0
          ) AS income,

          -- Expense in selected range
          COALESCE(
            SUM(
              CASE
                WHEN date >= ?
                 AND date < ?
                 AND txn_type = 'expense'
                THEN amount
                ELSE 0
              END
            ),
            0
          ) AS expense

        FROM transactions
        WHERE _status IS NOT 'deleted'
        `,
        [
          // Previous balance
          yearStart,
          dates.start,

          // Income
          dates.start,
          dates.end,

          // Expense
          dates.start,
          dates.end,
        ],
      ),
    )
    .unsafeFetchRaw();

  const previousBalance = Number(summary?.previous_balance ?? 0);
  const totalIncome = Number(summary?.income ?? 0);
  const totalExpense = Number(summary?.expense ?? 0);

  const periodBalance = totalIncome - totalExpense;

  const closingBalance = previousBalance + periodBalance;

  return {
    previousBalance,
    totalIncome,
    totalExpense,
    periodBalance,
    closingBalance,
  };
}
