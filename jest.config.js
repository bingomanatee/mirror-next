module.exports = {
  testPathIgnorePatterns: [
    "/Users/dave.edelhartmckesson.com/Documents/repos/mirror-next/.next/",
    "/Users/dave.edelhartmckesson.com/Documents/repos/mirror-next/node_modules/"],
  setupFilesAfterEnv: ["/Users/dave.edelhartmckesson.com/Documents/repos/mirror-next/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "/Users/dave.edelhartmckesson.com/Documents/repos/mirror-next/node_modules/babel-jest",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};
