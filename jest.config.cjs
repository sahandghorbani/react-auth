module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["reflect-metadata"],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./node_modules/@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
