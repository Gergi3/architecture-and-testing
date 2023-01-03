const { expect } = require('chai');
const { chromium } = require('playwright-chromium');


const url = 'http://127.0.0.1:5500';

describe('App tests', async function() {
    let browser, page;

    before(async () => await browser.launch());
    after(async () => await browser.close())
    
    beforeEach(async () =>  page = await browser.newPage());
    beforeEach(async () => await page.goto(url));
    afterEach(async () => await page.close())

    it('should refresh messages when refresh is clicked', async function() {
        let refreshBtn = page.click('text="Refresh"');
        
        
    })
});