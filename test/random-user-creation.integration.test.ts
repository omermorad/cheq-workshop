import supertest from 'supertest';
import 'jest-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { UserApiModule } from '@app/app/user-api/user-api.module';
import { HttpStatus, INestApplication } from '@nestjs/common';

describe('Creating a Random User Integration Test', () => {
  let moduleRef: TestingModule;
  let app: INestApplication;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [UserApiModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('POST /user/random with Faker Strategy Header', () => {
    let response: supertest.Response;

    beforeAll(async () => {
      response = await supertest(app.getHttpServer())
        .post('/user/random')
        .set({ 'x-random-user-strategy': 'FAKE' })
        .send();
    });

    it('should create a new random user', async () => {
      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.toBeString(),
        email: expect.toBeString(),
        name: expect.toBeString(),
      });
    });
  });

  describe('POST /user/random with Dummy API Strategy Header', () => {
    let response: supertest.Response;

    beforeAll(async () => {
      response = await supertest(app.getHttpServer())
        .post('/user/random')
        .set({ 'x-random-user-strategy': 'DUMMY' })
        .send();
    });

    it('should create a new random user', async () => {
      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.toBeString(),
        email: expect.toBeString(),
        name: expect.toBeString(),
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
