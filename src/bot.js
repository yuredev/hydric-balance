import puppeter from 'puppeteer';

(async () => {
  const HAMBURGER_SELECTOR = '#root > div.ui.top.attached.header-container.menu > div.left.menu > i';
  const START_DATE_SELECTOR = '#root > div.pushable.sidebar-content > div.ui.vertical.ui.overlay.left.visible.sidebar.menu > div:nth-child(2) > div:nth-child(8) > input[type=date]';
  const FINAL_DATE_SELECTOR = '#root > div.pushable.sidebar-content > div.ui.vertical.ui.overlay.left.visible.sidebar.menu > div:nth-child(2) > div:nth-child(10) > input[type=date]';
  const GENERATE_TABLE_BTN_SELECTOR = '#root > div.pushable.sidebar-content > div.ui.vertical.ui.overlay.left.visible.sidebar.menu > div:nth-child(2) > button';

  const browser = await puppeter.launch();
  const page = await browser.newPage();
  await page.setViewport({
    height: 640,
    width: 1280,
  })
  await page.goto('https://tempo.inmet.gov.br/TabelaEstacoes/A001');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './screenshots/1.png' });

  const hamburger = await page.$(HAMBURGER_SELECTOR);

  await hamburger.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './screenshots/2.png' });
  
  await page.$eval(START_DATE_SELECTOR, e => {
    e.value = '2021-05-01';
    e.disabled = 'disabled';
  });
  await page.$eval(FINAL_DATE_SELECTOR, e => {
    e.value = '2021-12-31';
    e.disabled = 'disabled';
  });
  await page.screenshot({ path: './screenshots/3.png' });
  const generateTableBtn = await page.$(GENERATE_TABLE_BTN_SELECTOR);
  await page.waitForTimeout(200);

  await generateTableBtn.click();
  await page.waitForTimeout(20);
  await page.screenshot({ path: './screenshots/4_com_botao_clicado.png' });
  await page.waitForTimeout(60 * 1000);
  await page.screenshot({ path: './screenshots/4.png' });


  
  await browser.close();
})();
