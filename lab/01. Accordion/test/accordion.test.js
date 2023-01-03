const chai = require('chai');
const { chromium } = require('playwright-chromium');

const options = { headless: false, slowMo: 200 };
const url = 'http://127.0.0.1:5500';


describe('Accordion tests', async function() {
    const accordionSelector = 'div.accordion:nth-of-type(1)';
    let browser, page;

    this.timeout(10000)
    beforeEach(async () => browser = await chromium.launch(options));
    beforeEach(async () => page = await browser.newPage());
    beforeEach(async () => await page.goto(url));
    afterEach(async () => await page.close());
    after(async () => await browser.close());    
    
    it('should load titles', async function() {
        let accordionBtn = await page.textContent('div.accordion button.button');

        chai.expect(accordionBtn).to.eq('More');
    });

    it('should have correct button show more/less button functionality', async function() {
        let accordionBtn = await page.locator(`${accordionSelector} button.button`);
        let accordionInfoElement = await page.locator(`${accordionSelector} div.extra p`);
        
        chai.expect(await accordionBtn.textContent()).to.eq('More');
        chai.expect(await accordionInfoElement.textContent()).to.be.empty;
        await accordionBtn.click();
        chai.expect(await accordionBtn.textContent()).to.eq('Less');
        chai.expect(await accordionInfoElement.textContent()).to.not.be.empty;
        await accordionBtn.click();
        chai.expect(await accordionBtn.textContent()).to.eq('More');
    });
})