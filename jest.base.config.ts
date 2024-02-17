import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    roots: ['src', 'test'],
    detectOpenHandles: true,
    preset: 'ts-jest',
    testLocationInResults: true,
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    testRegex: '.*(spec|integration.test).ts$',
    collectCoverageFrom: [
      'src/**/*.ts',
      '!<rootDir>/**/main.ts',
      '!<rootDir>/**/main.*.ts',
      '!<rootDir>/**/*.module.ts',
      '!<rootDir>/**/*.mock.ts',
      '!<rootDir>/**/*.seeder.ts',
      '!<rootDir>/**/*.fixture.ts',
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
    moduleNameMapper: {
      '@app/(.*)': '<rootDir>/src/modules/$1',
      '@test/(.*)': '<rootDir>/test/$1',
      '@fixtures/(.*)': '<rootDir>/test/fixtures/$1',
      '@infra/(.*)': '<rootDir>/src/modules/infrastructure/$1',
      '@common/(.*)': '<rootDir>/src/common/$1',
    },
    setupFilesAfterEnv: ['jest-extended/all'],
  };
};
