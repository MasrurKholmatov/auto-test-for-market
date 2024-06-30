// @ts-check
const { test, expect } = require('@playwright/test');
const { MainPage } = require('../pages/main.page');
const { HistoryPage } = require('../pages/history.page');

test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.open();
    await mainPage.closeAlerts();
    //Log in
    await mainPage.clickAccount();
    await mainPage.login('my.miller.m@gmail.com', 'therner.2');
    await mainPage.pageLoad('load');
});

test('проверка истории', async ({ page }) => {
    //вход в Мои заказы и проверка заголовка
    const mainPage = new MainPage(page);
    const historyPage = new HistoryPage(page);
    await mainPage.clickAccount();
    await mainPage.selectOrders();
    await historyPage.openOrders();

    //проверка списка заказов
    await historyPage.checkOrdersList();

    //проверка номеров заказов
    await historyPage.checkOrdersData();
});