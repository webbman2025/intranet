import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(__dirname, '../../assets/sharepoint-kit2-desktop-preview.png');
const url = 'http://localhost:5173/?design=kit2&embed=1';

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForSelector('.kit-page');
await page.locator('.kit-page').screenshot({ path: out, type: 'png', animations: 'disabled' });
const box = await page.locator('.kit-page').boundingBox();
console.log('Saved', out, box);
await browser.close();
