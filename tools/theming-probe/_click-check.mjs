import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

async function load() {
  await page.goto('http://localhost:10030/', { waitUntil: 'networkidle' });
  // Tag a genuine control: same-origin link with no .flair-card ancestor and
  // not in the admin bar.
  await page.evaluate(() => {
    const a = [...document.querySelectorAll('a[href]')].find(
      (el) => !el.closest('.flair-card') && !el.closest('#wpadminbar') &&
              el.href.startsWith(location.origin) && el.offsetParent
    );
    if (a) a.setAttribute('data-control', '1');
  });
}

async function cmdClick(sel, label) {
  await load();
  const loc = page.locator(sel).first();
  await loc.scrollIntoViewIfNeeded();
  const tabsBefore = ctx.pages().length;
  const urlBefore = page.url();
  await loc.click({ modifiers: ['Meta'] });
  await page.waitForTimeout(1500);
  const newTab = ctx.pages().length - tabsBefore > 0;
  const sameTab = page.url() !== urlBefore;
  console.log(`  ${label.padEnd(28)} new tab: ${newTab ? 'YES' : 'no '}    current tab also navigated: ${sameTab ? 'YES' : 'no'}`);
  for (const p of ctx.pages().slice(1)) await p.close();
}

await cmdClick('[data-control]', 'CONTROL ordinary link');
await cmdClick('.flair-card .title a', 'card heading link');
await browser.close();
