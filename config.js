const { join } = require("path");
const fs = require("fs");
const cartesianPower = require("./cartesian");

const configFilePath = join(__dirname, "config.json");

if (!fs.existsSync(configFilePath)) {
  console.log("ERROR: Config file does not exist");
  process.exit(1);
}

let { screens, scripts } = require("./config.json");
screens = Number(screens);
if (isNaN(screens) || !scripts) {
  console.log(
    "ERROR: Invalid config.json file. Please view config.example.json file for schema details"
  );
  process.exit(1);
}

const permutations = cartesianPower([0, 1], screens).map((arr) => arr.join(""));
const missingScripts = permutations.filter(
  (permutation) => !scripts[permutation]
);

if (missingScripts.length > 0) {
  console.log("ERROR: Missing scripts for:", missingScripts.join(", "));
  process.exit(1);
}

module.exports = { screens, scripts };
