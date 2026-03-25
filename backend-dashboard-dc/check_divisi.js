const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const data = await prisma.karyawan.findMany();
  console.log(data.map(d => d.divisi).filter((v, i, a) => a.indexOf(v) === i));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
