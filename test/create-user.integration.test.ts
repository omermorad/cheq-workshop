import { StartedTestContainer } from 'testcontainers';
import { PostgreSqlContainer } from '@testcontainers/postgresql';

describe('Creating a User Integration Test', () => {
  jest.setTimeout(60000);

  let container: StartedTestContainer;

  beforeAll(async () => {
    container = await new PostgreSqlContainer('postgres:latest')
      .withExposedPorts(5434)
      .withEnvironment({
        POSTGRES_USER: 'postgres',
        POSTGRES_DB: 'users',
      })
      .start();
  });

  afterAll(async () => {
    await container.stop();
  });

  it('works', async () => {});
});
