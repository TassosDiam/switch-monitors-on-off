const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const statusFile = path.join(__dirname, "screensStatus.json");

exports.init = function (screens) {
  const lastRebootInfo = execSync("who -b").toString().slice(0, -1);
  const lastRebootTime = new Date(
    lastRebootInfo.split(" ").slice(-2).join("T")
  );
  const statusFileLastUpdate = fs.statSync(statusFile).mtime;
  if (statusFileLastUpdate < lastRebootTime) {
    const screensStatus = new Array(screens).fill(1);
    fs.writeFileSync(statusFile, JSON.stringify(screensStatus));
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
