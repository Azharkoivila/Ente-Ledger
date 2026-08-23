import database from "@/src/db/database";

const handledb = async () => {
  console.log("db data");
  const txns = database.get("transactions");
  const records = await txns.query().fetch();
  records.forEach((record) => {
    console.log(record._raw);
  });
};

const hamdlermdb = async () => {
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

const handlenotes = async () => {
  console.log("db data");
  const txns = database.get("notes");
  const records = await txns.query().fetch();
  records.forEach((record) => {
    console.log(record._raw);
  });
};

export { hamdlermdb, handledb, handlenotes };
