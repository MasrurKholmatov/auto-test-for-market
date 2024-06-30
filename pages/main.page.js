import { BasePage } from './base.page';

const { expect } = require('@playwright/test');

export class MainPage extends BasePage {
    constructor(page) {
        super(page);
        this.accountButton = this.page.locator('xpath=//span[text() = "Аккаунт"]');
        this.loginButton = this.page.locator('xpath=//span[text() = "Войти"]');
        this.emailInput = this.page.getByLabel('Электронная почта');
        this.passwordInput = this.page.getByLabel('Пароль');
        this.submitButton = this.page.locator('xpath=//button[@data-testid="loginSubmit"]');
        this.loginForm = this.page.locator('xpath=//*[@data-testid="loginForm"]');
        this.catalogButton = page.locator('xpath=//button/span[text()="Каталог товаров"]');
        this.cartLink = page.locator('xpath=//span[contains(@class, "headerCartLabel")]');
        this.myOrdersButton = page.locator('xpath=//div[text()="Мои заказы"]');
        this.toCartFromSearch = page.locator('xpath=//span[text()="Корзина"]');
        this.catalogPopSelector = 'xpath=//div[contains(@class, "catalogPopup")]';
        this.alertCloseButtonSelector = 'xpath=//div[text() = "×"]';
        this.alertAdmitButtonSelector = 'xpath=//div[text() = "Принять"]';
    }

    getCategoryLocator(categoryName) {
        return this.page.locator(`xpath=//span[text()="${categoryName}"]`);
    }

    async addStuff() {
        await this.toCartFromSearch.click();
        await expect(this.page).toHaveURL("/order/");
        await this.page.waitForLoadState('load');
    }

    async selectOrders() {
        await this.myOrdersButton.click();
        await expect(this.page).toHaveURL('/profile/bought/');
    }

    async open() {
        await this.page.goto('/', { timeout: 100000, waitUntil: "domcontentloaded" });
    }

    async openCatalog() {
        await this.catalogButton.click();
        await this.page.waitForSelector(this.catalogPopSelector);
    }

    async selectCategory(categoryName) {
        await this.getCategoryLocator(categoryName).click();
        await this.page.waitForLoadState('load');

    }

    async closeAlerts() {
        await (await this.page.waitForSelector(this.alertAdmitButtonSelector)).click();
        await (await this.page.waitForSelector(this.alertCloseButtonSelector)).click();
    }

    async clickAccount() {
        await this.accountButton.click();
    }

    async login(email, password) {
        await this.loginButton.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
        await this.loginForm.waitFor({ state: "detached" });
    }

    async pageLoad(pageStateMethod) {
        await this.page.waitForLoadState(pageStateMethod);
        await expect(this.page).toHaveURL('/');
    }

    async openCart() {
        await this.cartLink.click();
        await this.page.waitForLoadState('load');
    }
};