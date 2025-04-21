const { join } = require("path");
const fs = require("fs");
const cartesianPower = require("./cartesian");

const configFilePath = join(__dirname, "config.json");

if (!fs.existsSync(configFilePath)) {
  console.log("ERROR: Config file does not exist");
  process.exit(1);
}

let { scripts, defaultStatus } = require("./config.json");
if (!scripts) {
  console.log(
    "ERROR: Invalid config.json file. Please view config.example.json file for schema details"
  );
  process.exit(1);
}

const screens = Object.keys(scripts)[0].length;

const permutations = cartesianPower([0, 1], screens).map((arr) => arr.join(""));
const missingScripts = permutations.filter(
  (permutation) => !scripts[permutation]
);
const invalidScripts = Object.keys(scripts).filter(
  (key) => !permutations.includes(key)
);

if (missingScripts.length > 0) {
  console.log("ERROR: Missing scripts for:", missingScripts.join(", "));
  process.exit(1);
}
if (invalidScripts.length > 0) {
  console.log(
    "ERROR: Invalid scripts found in config:",
    invalidScripts.join(", ")
  );
  process.exit(1);
}

if (defaultStatus) {
  if (!Array.isArray(defaultStatus) || defaultStatus.length !== screens) {
    console.log("ERROR: Invalid default status config value");
    process.exit(1);
  }
  if (defaultStatus.some((item) => ![0, 1].includes(item))) {
    console.log("ERROR: Invalid default status config value");
    process.exit(1);
  }
}

module.exports = { screens, scripts, defaultStatus };
