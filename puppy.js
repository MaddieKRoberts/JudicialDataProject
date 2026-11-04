const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const delay = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  //launches browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  //goes to website
  await page.goto('https://casesearch.courts.state.md.us/casesearch/inquiry-search');

  //clicks on the advanced search tab
  await page.click('#inquiry-search-tab-2')
  await page.pdf({path: 'adancedsearch.pdf'})

  //types the last name into the search field
  await page.type('#lastName', 'smith', { delay: 100 });
  await page.pdf({path: 'CheckForName.pdf', format: 'A4'});

  //clicks on the criminal cases checkbox
  await page.click('div.MuiGrid2-root:nth-child(7) > fieldset:nth-child(1) > div:nth-child(2) > label:nth-child(3) > span:nth-child(1) > input:nth-child(1)')
  await page.pdf({path: 'CriminalCasesCheck.pdf', format: 'A4'});

  //clicks on the search button
  await page.click('button.MuiButton-root:nth-child(1)')
  await delay(10000);
  await page.pdf({path: 'searchcheck.pdf', format: 'A4'});

  //waits for the first search result to appear
  await page.waitForSelector('div.MuiDataGrid-row:nth-child(1) > div:nth-child(2) > a:nth-child(1)', {timeout: 10000});
  await page.click('div.MuiDataGrid-row:nth-child(1) > div:nth-child(2) > a:nth-child(1)');
  await page.pdf({path: 'smithtest.pdf', format: 'A4'});

  //finds court case
  const caseid = await page.$eval('div.MuiDataGrid-row:nth-child(1) > div:nth-child(2) > a:nth-child(1)', el => el.textContent);
  await page.goto(`https://casesearch.courts.state.md.us/casesearch/case-detail-page?caseId=${caseid}`);

  //takes a screenshot of the case detail page
  await page.waitForSelector('#case-detail-title', {timeout: 10000});
  await page.pdf({path: 'CourtRecordsTest.pdf', format: 'A4'});

  await browser.close();
})();
