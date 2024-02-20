// import { PostgreSqlContainer } from '@testcontainers/postgresql';
import supertest from 'supertest';
import 'jest-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { UserApiModule } from '@app/app/user-api/user-api.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { CreateUserRequestSchema } from '@app/app/user-api/types/user.schemas';
import { Gender, User } from '@prisma/client';
import { PrismaService } from '@app/prisma/prisma.service';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql/build/postgresql-container';
import { randomEmail } from './seeder/functions';

describe('Creating a User Integration Test', () => {
  // jest.setTimeout(60000);

  let moduleRef: TestingModule;
  let app: INestApplication;
  let prisma: PrismaService;
  let container: StartedPostgreSqlContainer;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [UserApiModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);

    // container = await new PostgreSqlContainer('postgres:latest')
    //   .withUsername('postgres')
    //   .withPassword('postgres')
    //   .withDatabase('users')
    //   .withReuse()
    //   .start();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('POST /user', () => {
    let response: supertest.Response;
    const email = randomEmail();

    beforeAll(async () => {
      response = await supertest(app.getHttpServer())
        .post('/user')
        .send({
          name: 'Joe Doe',
          email,
          timezone: 'Europe/London',
          gender: Gender.Male,
        } satisfies CreateUserRequestSchema);
    });

    it('should create a new user', async () => {
      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.toBeString(),
        name: 'Joe Doe',
        email,
      });

      const inserted = await prisma.user.findUnique({ where: { id: response.body.id } });

      expect(inserted).toStrictEqual<User>({
        createdAt: expect.toBeDate(),
        email,
        gender: Gender.Male,
        id: expect.toBeString(),
        name: 'Joe Doe',
        timezone: 'Europe/London',
      });
    });
  });

  afterAll(async () => {
    await app.close();
    await container.stop();
  });
});
