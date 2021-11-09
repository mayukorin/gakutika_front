module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "vee-validate/dist/rules": "babel-jest",
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!vee-validate/dist/rules)",
  ],
  setupFilesAfterEnv: ["./tests/setup.js"],
};
