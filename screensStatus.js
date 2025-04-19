const path = require("path");
const fs = require("fs");

const statusFile = path.join(__dirname, "screensStatus.json");

const argv = process.argv[2];

exports.init = function (screens) {
  if (!argv || argv === "init") {
    const screensStatus = new Array(screens).fill(1);
    fs.writeFileSync(statusFile, JSON.stringify(screensStatus));
    process.exit(0);
  }
};

exports.getScreensStatus = function getScreensStatus(screens) {
  let screensStatus = new Array(screens).fill(1);
  if (fs.existsSync(statusFile)) {
    try {
      const statusData = JSON.parse(
        fs.readFileSync(statusFile, { encoding: "utf8" })
      );
      if (
        Array.isArray(statusData) &&
        statusData.length === screens &&
        statusData.every((item) => [0, 1].includes(item))
      ) {
        screensStatus = statusData;
      } else {
        console.log("ERROR: Invalid `screen-status` file");
      }
    } catch (ex) {
      console.log("ERROR: Invalid `screen-status` file");
    }
  }
  return screensStatus;
};

exports.updateScreensStatus = function updateScreensStatus(screensStatus) {
  fs.writeFileSync(statusFile, JSON.stringify(screensStatus));
};
