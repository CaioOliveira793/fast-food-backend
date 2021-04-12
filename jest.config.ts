/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest/utils';

export default {
	testEnvironment: 'node',

	preset: 'ts-jest',

	collectCoverage: true,
	collectCoverageFrom: [
		'./src/**/*.{js,ts}',
		'!**/node_modules/**',
		'!**/dist/**',
	],
	coverageDirectory: 'test/coverage',
	coverageProvider: 'v8',
	coverageReporters: [
		'text',
		'lcov',
	],
	coverageThreshold: {
		global: {
			branches: 50,
			functions: 50,
			lines: 50,
			statement: 50
		}
	},

	clearMocks: true,
	bail: 0,

	testMatch: [
		'**/__tests__/**/*.[jt]s?(x)',
		'**/?(*.)+(spec|test).[tj]s?(x)'
	],
	testPathIgnorePatterns: [
		'/node_modules/'
	],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src' })
};
