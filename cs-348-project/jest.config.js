const path = require('path');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: path.resolve(__dirname),  // Set this to the root of your Jest environment if not default
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    moduleNameMapper: {
        "^@/(.*)": "<rootDir>/src/$1"
    }
};

