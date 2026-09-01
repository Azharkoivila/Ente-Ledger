import * as Print from "expo-print";
import getHtml from "./printerHtmlTemplate";
export default async function generatePrint(
  txn,
  summery,
  accountName,
  accountId,
) {
  const ledgerHtml = getHtml(txn, summery, accountName, accountId);
  await Print.printAsync({
    html: ledgerHtml,
  });
}
