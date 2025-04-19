#!/home/tassos/.nvm/versions/node/v20.18.3/bin/node

const { exec } = require("child_process");
const { screens, scripts } = require("./config");
const {
  init,
  getScreensStatus,
  updateScreensStatus,
} = require("./screensStatus");

init(screens);

let screenToToggle = Number(process.argv[2]);
if (isNaN(screenToToggle) || screenToToggle < 1 || screenToToggle > screens) {
  console.log("ERROR: Invalid screen number");
  process.exit(1);
}
screenToToggle--;

const screensStatus = getScreensStatus(screens);

screensStatus[screenToToggle] = Math.abs(screensStatus[screenToToggle] - 1);
const scriptKey = screensStatus.join("");

updateScreensStatus(screensStatus);

exec(scripts[scriptKey]);
