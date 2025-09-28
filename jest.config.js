/** @type {import('jest').Config} */
const config = {
  clearMocks: true, // Reset mocks before every test to prevent bleed-over.
  collectCoverage: true, // Never ship code without knowing coverage.
  coverageDirectory: "coverage", // Output coverage to coverage/
  testEnvironment: "jsdom", // We’re simulating browsers (React).
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"], // Find relevant test files
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Import jest-dom + any custom setup
  verbose: true, // Print clear pass/fail info for every test

  // --- ADDED: CSS Mocking Rule ---
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  // -------------------------------
};

module.exports = config;