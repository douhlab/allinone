const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

const esModules = ['.*\\.mjs$'].join('|');

module.exports = {
  maxWorkers: 3,
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  // match (and therefore not transform) files inside node_modules
  // except all ES modules listed & mjs files
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes.js',
    'jest-preset-angular/build/serializers/ng-snapshot.js',
    'jest-preset-angular/build/serializers/html-comment.js'
  ],
  transform: {
    'node_modules\\/.+\\.js$': 'jest-esm-transformer',
    '^.+\\.(ts|js|mjs|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$'
      }
    ]
  },
  globals: {},
  // Moved to custom directory since this one will be cleaned after each build
  // Default directory under /tmp did cause out of disk space issues after some while
  cacheDirectory: '.jest-cache',
  snapshotFormat: { escapeString: true, printBasicPrototype: true },
  clearMocks: true
};
