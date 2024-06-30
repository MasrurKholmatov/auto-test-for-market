import { BasePage } from './base.page';

const { expect } = require('@playwright/test');

export class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.deleteButton = page.locator('xpath=//button[@aria-label="Удалить товар"]');
        this.deleteButtonPopup = page.locator('xpath=//div[text()="Удалить"]');
        this.stuffCount = page.locator('xpath=//div[@data-testid="basket-tab"]/*[contains(@class, "BasketTabsScreen_counter")]');
        this.stuffName = page.locator('xpath=//a[contains(@class, "BasketItem_title")]');
        this.cleanCartButton = page.locator('xpath=//span[contains(@class, "headerCartLabel")]');
        this.cartContentDivSelector = 'xpath=//div[@data-testid="basket-tab"]';

    }

    async cleanCart() {
        await this.page.waitForLoadState('load');
        await this.page.waitForSelector(this.cartContentDivSelector);
        const contentText = 'Корзина пуста';
        const deleteStuff = await this.deleteButton.count();
        for (let i = 0; i < deleteStuff; i++) {
            await this.deleteButton.nth(0).click();
            await this.deleteButtonPopup.click();
        }
        await this.page.waitForLoadState('load');
        expect(this.page.getByText(contentText)).toBeDefined();
    }

    async searchStuff(value) {
        await this.inputSearchField.click()
        await this.inputSearchField.fill(value);
        await this.searchButton.click();
        await this.page.waitForLoadState('load');
    }

    async checkAddedStuff(value) {
        await expect(this.stuffCount).toHaveText('1');
        await expect(this.stuffName).toContainText(value);
    }
}