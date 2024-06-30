// @ts-check
const { test, expect } = require('@playwright/test');
const { MainPage } = require('../pages/main.page');
const { ComputersPage } = require('../pages/computers.page');
const { NotebooksPage } = require('../pages/notebooks.page');

test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.open();
    await mainPage.closeAlerts();
    //Log in
    await mainPage.clickAccount();
    await mainPage.login('my.miller.m@gmail.com', 'therner.2');
    await mainPage.pageLoad('load');
});

test('Use filters in laptop page', async ({ page }) => {
    //переход на страницу Каталог товаров
    const mainPage = new MainPage(page);
    const notebooksPage = new NotebooksPage(page);
    const computersPage = new ComputersPage(page);

    await mainPage.openCatalog();
    await mainPage.selectCategory('Компьютеры и периферия');

    //переход на страницу компьютеров и далее на страницу с ноутбуками
    await computersPage.selectNotebooksCategory();

    //приминение фильтров и результат применения фильтров
    await notebooksPage.selectNotebookFilters();
});