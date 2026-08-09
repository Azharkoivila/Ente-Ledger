// import { Q } from "@nozbe/watermelondb";
// import { withObservables } from "@nozbe/watermelondb/react";

// import { database } from "@/app/db/model";
// import Transaction from "@/app/db/model/transaction";

// const EnhancedOverview = withObservables([], () => ({
//   transactions: database.collections
//     .get<Transaction>("transactions")
//     .query(
//       Q.sortBy("date", Q.desc), // Instantly limits memory footprint for millions of rows
//     )
//     .observe(),
// }))();
