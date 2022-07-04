import { z } from 'zod';
import { query, run } from '../services/db';

const contactSchema = z.object({
  full_name: z.string(),
  phone_work: z.string(),
  phone_mobile: z.string(),
  phone_other: z.string(),
  phone_home: z.string(),
  email: z.string(),
  address: z.string(),
});

const getParams = z.optional(
  z.object({
    page: z.number(),
    limit: z.number(),
    sortBy: z.string(),
    order: z.union([z.literal('ASC'), z.literal('DESC')]),
  }),
);

function getMultiple({
  page = 1,
  limit = 20,
  sortBy = 'contact_id',
  order = 'ASC',
}: z.infer<typeof getParams>) {
  getParams.parse({ page, limit, sortBy, order });
  const offset = (page - 1) * limit;
  const data = query(
    `
        SELECT * FROM contact 
        ORDER BY ${sortBy} ${order}
        LIMIT ?,?;
    `,
    [offset, limit],
  );

  const meta = { page, sortBy, order };
  return { data, meta };
}

function updateContact(id: number, contact: z.infer<typeof contactSchema>) {
  contactSchema.parse(contact);
  const {
    full_name,
    phone_work,
    phone_mobile,
    phone_home,
    phone_other,
    email,
    address,
  } = contact;
  return run(
    `UPDATE contact 
    SET 
        full_name = ?,
        phone_work = ?,
        phone_mobile = ?,
        phone_home = ?,
        phone_other = ?,
        email = ?,
        address = ?
    WHERE contact_id = ?`,
    [
      full_name,
      phone_work,
      phone_mobile,
      phone_home,
      phone_other,
      email,
      address,
      id,
    ],
  );
}

function createContact(contact: z.infer<typeof contactSchema>) {
  contactSchema.parse(contact);
  const {
    full_name,
    phone_work,
    phone_mobile,
    phone_home,
    phone_other,
    email,
    address,
  } = contact;
  return run(
    `INSERT INTO contact (
        full_name,
        phone_work,
        phone_mobile,
        phone_home,
        phone_other,
        email,
        address
    ) VALUES (?,?,?,?,?,?,?)`,
    [
      full_name,
      phone_work,
      phone_mobile,
      phone_home,
      phone_other,
      email,
      address,
    ],
  );
}

function deleteContact(contactId: number) {
  return run('DELETE FROM contact WHERE contact_id = ?', [contactId]);
}

export { getMultiple, deleteContact, createContact, updateContact };
