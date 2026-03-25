const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DIVISI_OPTIONS = [
    'Checker Reciving',
    'Helper Receiving',
    'Cheker Return',
    'Helper Return',
    'Admin Receiving',
    'Staff Receiving',
    'Admin Return',
    'Staff Return',
];
const DIVISI_FILTER = new Set(DIVISI_OPTIONS);

async function main() {
  const data = await prisma.karyawan.findMany();
  console.log("ALL DATA:");
  console.log(data);
  console.log("FILTERED DATA:");
  console.log(data.filter(k => DIVISI_FILTER.has(k.divisi)));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
