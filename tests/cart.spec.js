// @ts-check
const { test, expect } = require('@playwright/test');
const { MainPage } = require('../pages/main.page');
const { CartPage } = require('../pages/cart.page');
const { SearchResultPage } = require('../pages/search.result.page');

test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.open();
    await mainPage.closeAlerts();
    //Log in
    await mainPage.clickAccount();
    await mainPage.login('my.miller.m@gmail.com', 'therner.2');
    await mainPage.pageLoad('load');
});

test('проверка добавления в корзину', async ({ page }) => {
    const stuffNames = ["Мультиварка Redmond MC109", "Sony WH-1000XM4B", "Philips GC1742/40"];
    for (const stuffName of stuffNames) {
        //очистка корзины
        const cartPage = new CartPage(page);
        const mainPage = new MainPage(page);
        const searchResultPage = new SearchResultPage(page);

        await mainPage.openCart();
        await cartPage.cleanCart();

        //поиск и добавление в корзину
        await cartPage.searchStuff(stuffName);
        await searchResultPage.addSearchedStuff();

        await mainPage.addStuff();

        await cartPage.checkAddedStuff(stuffName);

        //очистка корзины
        await cartPage.cleanCart();
    }

});

test('проверка удаления из корзины', async ({ page }) => {
    //очистка корзины
    const cartPage = new CartPage(page);
    const mainPage = new MainPage(page);

    await mainPage.openCart();
    await cartPage.cleanCart();
});