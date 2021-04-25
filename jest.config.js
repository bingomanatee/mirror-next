const dir = __dirname;
module.exports = {
  testPathIgnorePatterns: [
    dir + "/.next/",
  dir +  "/node_modules/"],
  setupFilesAfterEnv: [dir + "/setupTests.js"],
  testTimeout: 10000,
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": dir + "/node_modules/babel-jest",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};
