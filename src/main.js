const { getEnv, getEnvToLoad } = require('./helpers');
const { getTopbar, getAccessToken, copyToClipboard, waitForBtnWithTxt } = require('./helpers');
const puppeteer = require('puppeteer');

module.exports.main = async (dirName) => {
  const envToLoad = getEnvToLoad();
  const env = getEnv(envToLoad, dirName);
  console.log(`Getting access token in ${envToLoad.toUpperCase()}...`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  // don't load styling to speed up pptr
  page.on('request', (req) => {
    const isCss = req.resourceType() == 'stylesheet';
    const isFont = req.resourceType() == 'font';
    const isImage = req.resourceType() == 'image';

    if (isCss || isFont || isImage) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto(env.LOGIN_URL);

  const loginBtn = await waitForBtnWithTxt({ page, txt: 'Log in' });
  await page.type(`[name='username']`, env.USERNAME);
  await page.type(`[name='password']`, env.PASSWORD);
  await loginBtn.click();

  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  await page.evaluate(getTopbar, env.TOPBAR_SELECTOR);

  const accessToken = await page.evaluate(getAccessToken, env.TOPBAR_SELECTOR);
  copyToClipboard(accessToken);
  console.log(`Access token in ${envToLoad.toUpperCase()}: ${accessToken}`);

  await browser.close();
};
