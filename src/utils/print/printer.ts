import * as Print from "expo-print";
import getHtml from "./genarateHtml";
export default async function genarateHtml(txn, summery) {
  const ledgerHtml = getHtml(txn, summery);
  await Print.printAsync({
    html: ledgerHtml,
  });
}
