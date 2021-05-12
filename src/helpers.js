const path = require('path');
const fs = require('fs');
const clipboardy = require('clipboardy');

const doesFileExist = (filePath) => {
  try {
    const fileExist = fs.existsSync(filePath);
    return fileExist ? true : false;
  } catch (err) {
    console.error(err);
  }
};

module.exports.getEnv = (envToLoad) => {
  const filePath = path.resolve(process.cwd(), `.env.${envToLoad}`);
  if (!doesFileExist(filePath)) {
    throw new Error(`The file does not exist: ${filePath}`);
  }
  require('dotenv').config({
    path: path.resolve(process.cwd(), `.env.${envToLoad}`),
  });
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
