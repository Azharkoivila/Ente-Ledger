import database from "@/src/db/database.native";
import Account from "@/src/db/model/account";
import { Q } from "@nozbe/watermelondb";
import { map } from "@nozbe/watermelondb/utils/rx";

class AccountRepository {
  observeUser() {
    return database
      .get<Account>("account")
      .query(Q.take(1))
      .observeWithColumns(["account_name", "created_at"])
      .pipe(
        map((record) =>
          record.map((account) => ({
            accountName: account.accountName,
            accountId: account.id,
          })),
        ),
      );
  }
}

export default new AccountRepository();
