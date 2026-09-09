import database from "@/src/db/database";
import Category from "@/src/db/model/category";
import Transaction from "@/src/db/model/transaction";
import {
  AddCategoryPARAM,
  TransactionData,
  UpdateCategoryPARAM,
} from "@/src/types";
import { Q } from "@nozbe/watermelondb";
import * as Crypto from "expo-crypto";

export async function getTransaction(id: string) {
  return await database.get<Transaction>("transactions").find(id);
}

export async function createTransaction(entry: TransactionData) {
  try {
    await database.write(async () => {
      await database.get<Transaction>("transactions").create((record) => {
        record.transactionId = Crypto.randomUUID();
        record.category = entry.category;
        record.amount = Number(entry.amount);
        record.date = entry.date;
        record.transactionType = entry.transactionType;
        record.note = String(entry.note);
      });
    });
    return { status: true, message: "transactionSuccess" };
  } catch (error) {
    console.log(caches);
    return { status: false, error };
  }
}

export const handleDeleteCategory = async (id: string) => {
  await database.write(async () => {
    const record = await database.get("category").find(id);
    console.log(record);

    await record.destroyPermanently();
  });
};

export const updateCategory = async (input: UpdateCategoryPARAM) => {
  await database.write(async () => {
    const post = await database.get<Category>("category").find(input.id);
    await post.update((record) => {
      record.categoryName = input.value.toUpperCase();
      record.categoryValue = input.value;
    });
  });
};

export const addCategory = async (input: AddCategoryPARAM) => {
  await database.write(async () => {
    const newTxn = await database
      .get<Category>("category")
      .create((category) => {
        category.categoryId = Crypto.randomUUID();
        category.categoryName = input.value.toUpperCase();
        category.categoryValue = input.value;
      });
  });
};

export const flushTransactions = async () => {
  await database.write(async () => {
    const allRecords = await database.collections
      .get("transactions")
      .query()
      .fetch();
    const deletedBatch = allRecords.map((record) =>
      record.prepareDestroyPermanently(),
    );
    await database.batch(deletedBatch);
  });
};

export const updateTransaction = async (id: string, state: TransactionData) => {
  console.log("from dbfn ", state);

  try {
    await database.write(async () => {
      const post = await database.get<Transaction>("transactions").find(id);
      await post.update((record) => {
        record.category = state.category;
        record.amount = Number(state.amount);
        record.date = state.date;
        record.transactionType = state.transactionType;
        record.note = String(state.note);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneCategory = async () => {
  const record = await database
    .get<Category>("category")
    .query(Q.take(1))
    .fetch();
  return record[0];
};
