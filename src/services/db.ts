import Database from 'better-sqlite3';

const db = new Database('./contacts.db' /*{ verbose: console.log }*/);

function query(sql: string, params: unknown[] = []) {
  return db.prepare(sql).all(params);
}

function run(sql: string, params: unknown[] = []) {
  return db.prepare(sql).run(params);
}

function initializeDb() {
  console.log('Initializing database...');
  return run(
    `
    CREATE TABLE IF NOT EXISTS contact (
        contact_id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        phone_work TEXT NOT NULL,
        phone_mobile TEXT NOT NULL,
        phone_home TEXT NOT NULL,
        phone_other TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT NOT NULL
);`,
  );
}

export { initializeDb, query, run };
