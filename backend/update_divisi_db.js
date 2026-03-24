const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const fixes = [
    { old: 'Checker Reciving', new: 'Checker Receiving' },
    { old: 'Cheker Return', new: 'Checker Return' },
    { old: 'Staff Warhouse', new: 'Staff Warehouse' }
  ];

  for (const { old: oldVal, new: newVal } of fixes) {
    const res = await prisma.karyawan.updateMany({
      where: { divisi: oldVal },
      data: { divisi: newVal }
    });
    console.log(`Updated ${res.count} records from '${oldVal}' to '${newVal}'`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
