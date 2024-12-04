import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.class.createMany({
    data: [
        { name: 'P1A' },
        { name: 'P2A' },
        { name: 'P3A' },
        { name: 'P4A' },
    ],
  });
  await prisma.student.createMany({
    data: [
        { name: 'Alice', age: 15, classId: 1 },
        { name: 'Bob', age: 16, classId: 2 },
        { name: 'Charlie', age: 17, classId: 3 },
        { name: 'David', age: 18, classId: 4 },
        { name: 'Eve', age: 19, classId: 1 },
        { name: 'Frank', age: 20, classId: 2 },
        { name: 'Grace', age: 21, classId: 3 },
        { name: 'Hannah', age: 22, classId: 4 },
    ]
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});