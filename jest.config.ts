import type { Config } from '@jest/types';
import base from './jest.base.config';

export default async (coverageFileName = 'coverage-report'): Promise<Config.InitialOptions> => {
  const baseConfig = await base();
  const coverFile = process.env.COVERAGE_REPORT_BASE_FILE_NAME || coverageFileName;

  return {
    verbose: true,
    collectCoverage: true,
    testResultsProcessor: 'jest-junit',
    reporters: ['default', 'jest-junit'],
    coverageReporters: ['text', ['cobertura', { file: `${coverFile}.xml` }]],
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    projects: [
      {
        ...baseConfig,
        displayName: 'unit',
        testRegex: '.spec.ts$',
      },
      {
        ...baseConfig,
        displayName: 'integration',
        testRegex: '.integration.test.ts$',
      },
    ],
  };
};
