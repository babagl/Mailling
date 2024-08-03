const { transform } = require("typescript");

module.exports = {
    transform: {
        '^.+\\.ts$':'ts-jest',
    },
    moduleExtension:['js','ts'],
    testMatch: [
        '**/test/**/*.test.ts'
    ],
    testEnvironment:'node',
}