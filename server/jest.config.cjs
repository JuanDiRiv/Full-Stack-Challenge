module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/src/tests"],
    setupFiles: ["<rootDir>/src/tests/setup/env.setup.ts"],
    setupFilesAfterEnv: ["<rootDir>/src/tests/setup/db.setup.ts"],
    clearMocks: true,
};
