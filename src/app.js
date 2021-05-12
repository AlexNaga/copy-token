const { getEnv, getTopbar, getAccessToken, copyToClipboard, waitForBtnWithTxt } = require('./helpers');
const puppeteer = require('puppeteer');
const envToLoad = process.argv[2] || 'test';
const env = getEnv(envToLoad);

(async () => {
  console.log(`Getting access token in ${envToLoad.toUpperCase()}...`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(env.LOGIN_URL);

  const loginBtn = await waitForBtnWithTxt({ page, txt: 'Log in' });
  await page.type(`[name='username']`, env.USERNAME);
  await page.type(`[name='password']`, env.PASSWORD);
  await loginBtn.click();

  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  await page.evaluate(getTopbar, env.TOPBAR_SELECTOR);

  const accessToken = await page.evaluate(getAccessToken, env.TOPBAR_SELECTOR);
  copyToClipboard(accessToken);
  console.log(`Access token in ${envToLoad.toUpperCase()}: ${accessToken}`);

  await browser.close();
})();
