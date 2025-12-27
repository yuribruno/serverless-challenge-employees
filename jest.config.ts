import type { Config } from 'jest';

const MILLISECOND_IN_SECOND = 1000;
const TEST_TIMEOUT_IN_SECONDS = 10;
const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePaths: ['<rootDir>'],
  testRegex: '.*\\.spec\\.ts$',
  testTimeout: TEST_TIMEOUT_IN_SECONDS * MILLISECOND_IN_SECOND,
  moduleNameMapper: {
    '~(.+)': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};

export default config;
