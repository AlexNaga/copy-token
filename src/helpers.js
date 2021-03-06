const fs = require('fs');
const clipboardy = require('clipboardy');

module.exports.doesFileExist = (filePath) => {
  try {
    const fileExist = fs.existsSync(filePath);
    return fileExist ? true : false;
  } catch (err) {
    console.error(err);
  }
};

module.exports.getEnvToLoad = () => process.argv[2] || 'test';

module.exports.getEnv = (envToLoad, dirName) => {
  const filePath = `${dirName}/.env.${envToLoad}`;
  if (!this.doesFileExist(filePath)) {
    throw new Error(`The file does not exist: ${filePath}`);
  }
  require('dotenv').config({ path: filePath });
  return process.env;
};

module.exports.getTopbar = (topbarSelector) =>
  new Promise((resolve) => {
    const isTopbarFound = window[topbarSelector] && Object.keys(window[topbarSelector]).includes('hasLoaded');
    const topbarHasLoaded = isTopbarFound && window[topbarSelector].hasLoaded;

    if (topbarHasLoaded) {
      return resolve(window[topbarSelector]);
    }

    // If topbar not found, wait for topbarLoaded event
    window.addEventListener('topbarLoaded', () => {
      resolve(window[topbarSelector]);
    });
  });

module.exports.getAccessToken = (topbarSelector) => window[topbarSelector].access_token;

module.exports.waitForBtnWithTxt = async ({ page, txt }) => {
  const xPathSelector = `//button[contains(.,"${txt}")]`;
  await page.waitForXPath(xPathSelector);
  const [btn] = await page.$x(xPathSelector);
  return btn;
};

module.exports.copyToClipboard = (txt) => clipboardy.writeSync(txt);

module.exports.isRequestCss = (req) => req.resourceType() === 'stylesheet';
module.exports.isRequestFont = (req) => req.resourceType() === 'font';
module.exports.isRequestImage = (req) => req.resourceType() === 'image';

module.exports.isRequestStyling = (req) =>
  this.isRequestCss(req) || this.isRequestFont(req) || this.isRequestImage(req);
