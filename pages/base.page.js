const { expect } = require('@playwright/test');

export class BasePage {
    constructor(page) {
        this.page = page;
        this.inputSearchField = page.locator('xpath=//input[@placeholder="Поиск товаров"]');
        this.searchButton = page.locator('xpath=//button[contains(@class, "Search_searchBtn")]');
    }
}