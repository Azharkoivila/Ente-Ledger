// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    extends: "universe/native",
  },
  {
    ignores: ["dist/*"],
  },
  {
    rules: {
      "no-console": "warn",
      eqeqeq: ["error", "always"],
      complexity: ["warn", { max: 10 }],
      camelcase: ["error", { properties: "always" }],
    },
  },
  {
    settings: {
      "import/ignore": [
        "/src/db/database",
        "node_modules/react-native/index\\.js$",
      ],
    },
  },
]);
