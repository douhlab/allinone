const { pathsToModuleNameMapper } = require('ts-jest');

const esModules = ['.*\\.mjs$'].join('|');

module.exports = {
	maxWorkers: 3,
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts']
};
