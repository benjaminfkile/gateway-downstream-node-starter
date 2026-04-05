import knex, { Knex } from "knex";
import { IAPISecrets, IDBSecrets } from "../interfaces";
import health from "./health";

let db: Knex | null = null;

export async function initDb(
  dbSecrets: IDBSecrets,
  appSecrets: IAPISecrets
): Promise<Knex> {
  if (db) return db;

  const { username, password, host, port } = dbSecrets;
  const { db_name } = appSecrets;

  db = knex({
    client: "pg",
    connection: {
      host,
      user: username,
      password,
      database: db_name,
      port,
      ssl: { rejectUnauthorized: false },
    },
  });

  const dbHealth = await health.getDBConnectionHealth(db, true);
  console.log(dbHealth.logs);

  return db;
}

export function getDb(): Knex {
  if (!db) {
    throw new Error("Database has not been initialized. Call initDb() first.");
  }
  return db;
}
