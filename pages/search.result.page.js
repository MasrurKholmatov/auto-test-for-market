import { BasePage } from './base.page';

const { expect } = require('@playwright/test');

export class SearchResultPage extends BasePage {
    constructor(page) {
        super(page);
        this.addToCartButton = page.locator('xpath=//button[text()="В корзину"]');
        // this.addToCartButtonSelector = 'xpath=//button[text()="В корзину"]'; // сгруппировать сперва селекторы, потом локаторы
    }

    async addSearchedStuff() {
        // await this.page.waitForSelector(this.addToCartButtonSelector);
        await this.addToCartButton.click();
    }
}