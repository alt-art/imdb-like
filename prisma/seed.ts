import { PrismaClient, ReviewType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { genSalt, hash } from 'bcrypt';

(async () => {
  const prisma = new PrismaClient();
  await prisma.review.deleteMany();
  await prisma.user.deleteMany();
  await prisma.film.deleteMany();
  await prisma.$queryRaw`ALTER SEQUENCE "Film_id_seq" RESTART WITH 1`;
  await prisma.$queryRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
  await prisma.$queryRaw`ALTER SEQUENCE "Review_id_seq" RESTART WITH 1`;

  for (let i = 0; i < 10; i++) {
    await prisma.film.create({
      data: {
        title: `${faker.science.chemicalElement().name} ${faker.random.word()}`,
        director: faker.name.fullName(),
        year: faker.date.past(10).getFullYear(),
      },
    });
  }

  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: await hash(faker.internet.password(), await genSalt(10)),
        role: 'USER',
      },
    });

    for (let j = 0; j < 5; j++) {
      const film = await prisma.film.findUnique({
        where: { id: Math.floor(Math.random() * 10) + 1 },
      });
      if (!film) {
        continue;
      }
      await prisma.review.create({
        data: {
          type: [ReviewType.POSITIVE, ReviewType.NEUTRAL, ReviewType.NEGATIVE][
            Math.floor(Math.random() * 3)
          ],
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
          film: { connect: { id: film.id } },
          user: { connect: { id: user.id } },
        },
      });
    }
  }

  await prisma.user.create({
    data: {
      email: 'demo@example.com',
      password: await hash('demo', await genSalt(10)),
      role: 'ADMIN',
    },
  });

  await prisma.$disconnect();
})();
