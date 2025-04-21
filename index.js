const { exec } = require("child_process");
const { screens, scripts } = require("./config");
const {
  init,
  getScreensStatus,
  updateScreensStatus,
} = require("./screensStatus");

init(screens);

const argument = process.argv[2];
const argumentArray = argument.split("-");
let scriptKey = "";
let screensStatus = [];

if (argumentArray.length === 1) {
  let screenToToggle = Number(argument);
  if (isNaN(screenToToggle) || screenToToggle < 1 || screenToToggle > screens) {
    console.log("ERROR: Invalid script argument");
    process.exit(1);
  }
  screenToToggle--;

  screensStatus = getScreensStatus(screens);

  screensStatus[screenToToggle] = Math.abs(screensStatus[screenToToggle] - 1);
} else {
  if (argumentArray.length !== screens) {
    console.log("ERROR: Invalid script argument");
    process.exit(1);
  }
  if (argumentArray.some((item) => !["0", "1"].includes(item))) {
    console.log("ERROR: Invalid script argument");
    process.exit(1);
  }
  screensStatus = argumentArray.map((item) => Number(item));
}
scriptKey = screensStatus.join("");

updateScreensStatus(screensStatus);

exec(scripts[scriptKey]);
