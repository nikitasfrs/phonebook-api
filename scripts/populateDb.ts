import Database from 'better-sqlite3';
import { faker } from '@faker-js/faker';

const db = new Database('./contacts.db', { verbose: console.log });

/**
 * Creates random contact using faker
 * @returns
 */
function createRandomContact() {
  return [
    faker.name.firstName() + ' ' + faker.name.lastName(),
    faker.phone.number(),
    faker.phone.number(),
    faker.phone.number(),
    faker.phone.number(),
    faker.internet.email(),
    faker.address.streetAddress(),
  ];
}

/**
 * Escapes apostrophes and wraps value with single quotation mark
 * @param value
 * @returns
 */
function appendQueryValue(value: string) {
  return "'" + value.replace(/'/g, "''") + "'";
}
console.log('Initializing database...');
db.prepare(
  `
    DROP TABLE IF EXISTS contact;
`,
).run();

db.prepare(
  `
    CREATE TABLE contact (
        contact_id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        phone_work TEXT NOT NULL,
        phone_mobile TEXT NOT NULL,
        phone_home TEXT NOT NULL,
        phone_other TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT NOT NULL
)`,
).run();
console.log('Generating mock data...');
let query = `INSERT INTO contact (
        full_name,
        phone_work,
        phone_mobile,
        phone_home,
        phone_other,
        email,
        address
    ) VALUES
 `;
for (let i = 0; i < 150; i++) {
  query += `(${createRandomContact().map(appendQueryValue).join(',')}),`;
}
query = query.slice(0, -1) + ';';
db.prepare(query).run();
