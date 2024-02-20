import { Test, TestingModule } from '@nestjs/testing';
import { UserDal } from '@app/user-dal/user.dal';
import { PrismaService } from '@app/prisma/prisma.service';
import { Gender, User } from '@prisma/client';
import { UserDalModule } from '@app/user-dal/user-dal.module';
import { randomEmail } from '../../../test/seeder/functions';

describe('Creating a Random User Integration Test', () => {
  let underTest: UserDal;
  let moduleRef: TestingModule;
  let prisma: PrismaService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({ imports: [UserDalModule] }).compile();
    underTest = moduleRef.get(UserDal);
    prisma = moduleRef.get(PrismaService);
  });

  describe('Email exists', () => {
    const email = randomEmail();

    beforeAll(async () => {
      await prisma.user.create({
        data: { email, name: 'dummy', gender: Gender.Other, timezone: 'Timezone' },
      });
    });

    it('should throw an error because email exists', async () => {
      const promise = underTest.createUser({
        email,
        name: 'dummy',
        gender: Gender.Other,
        timezone: 'Timezone',
      });

      await expect(promise).rejects.toThrow();
    });

    it('should success because email does no exist', async () => {
      const result = await underTest.createUser({
        email: randomEmail(),
        name: 'dummy',
        gender: Gender.Other,
        timezone: 'Timezone',
      });

      expect(result).toMatchSnapshot<User>({
        email: expect.toBeString(),
        name: 'dummy',
        gender: Gender.Other,
        timezone: 'Timezone',
        id: expect.toBeString(),
        createdAt: expect.toBeDate(),
      });
    });

    afterAll(async () => {
      await moduleRef.close();
    });
  });
});
