import { faker } from "@faker-js/faker";

export const tableColumns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "status", label: "Status" },
  { key: "amount", label: "Amount" },
];

export const tableData = Array.from({ length: 30 }).map(() => ({
  id: faker.string.uuid().slice(0, 8),
  name: faker.person.fullName(),
  category: faker.commerce.department(),
  status: faker.helpers.arrayElement([
    "Approved",
    "Rejected",
    "On Hold",
  ]),
  amount: `₹ ${faker.number.int({
    min: 500,
    max: 50000,
  })}`,
}));
