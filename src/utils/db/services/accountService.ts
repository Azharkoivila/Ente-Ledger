import database from "@/src/db/database";
import Account from "@/src/db/model/account";
import { Q } from "@nozbe/watermelondb";
import * as Crypto from "expo-crypto";
export async function getAccount() {
  return await database.get<Account>("account").query(Q.take(1)).fetch();
}

export async function setAccount(userName) {
  await database.write(async () => {
    await database.get<Account>("account").create((record) => {
      record.createdAt = Crypto.randomUUID();
      record.accountName = String(userName);
    });
  });
}

export async function updateAccount(userName, id) {
  await database.write(async () => {
    const post = await database.get<Account>("account").find(id);
    await post.update((record) => {
      record.accountName = String(userName);
    });
  });
}
