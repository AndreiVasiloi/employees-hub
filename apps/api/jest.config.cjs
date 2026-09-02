/** @type {import('jest').Config} */
module.exports = {
  displayName: 'api',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/*.spec.ts',
    '<rootDir>/test/**/*.spec.ts',
    '<rootDir>/test/**/*.integration-spec.ts',
  ],
};
