import { time } from 'console';
import { BasePage } from './base.page';
const { expect } = require('@playwright/test');

export class FavoritesPage extends BasePage {
    constructor(page) {
        super(page);
        this.favoritesButton = page.locator('xpath=//div[text() = "Избранные товары"]');
        this.favoritesDeleteButton = page.locator('xpath=//button[contains(@class, "OldProductCard_removeBtn")]');
        this.addToFavoritesButton = page.locator('xpath=//button[contains(@aria-label, "В избранное")]');
        this.addedFavoriteStuff = page.locator('xpath=//div[contains(@class, "OldProductCard_card")]');
        this.favoritesContentSelector = 'xpath=//div[contains(@class, "FavoriteScreen_content")]';
        this.favoritesButtonSelector = 'xpath=//div[contains(text(), "Избранные товары")]';
        this.stuffButtonSelector = 'xpath=//button[contains(@class, "result__buybtn")]';
    }

    getStuffNameLinkLocator(stuffName) {
        return this.page.locator(`xpath=//span[text()="${stuffName}"]`);
    }

    async openFavorites() {
        await this.page.waitForSelector(this.favoritesButtonSelector);
        await this.favoritesButton.click();
        await this.page.waitForLoadState('load');
    }

    async pageLoad(pageStateMethod) {

        await expect(this.page).toHaveURL('/aside/');
        await this.page.waitForLoadState(pageStateMethod);
    }

    async cleanFavorites() {
        const contentText = 'Нет избранных товаров';
        await this.page.waitForLoadState('load');
        await this.page.waitForSelector(this.favoritesContentSelector);
        const deleteStuff = await this.favoritesDeleteButton.count();
        for (let i = 0; i < deleteStuff; i++) {
            await this.favoritesDeleteButton.nth(0).click();
        }
        await this.page.waitForLoadState('load');
        expect(this.page.getByText(contentText)).toBeDefined();
    }

    async searchStuff(stuff) {
        // await this.page.waitForLoadState('load');
        await this.inputSearchField.click();
        await this.inputSearchField.fill(stuff);
        await this.searchButton.click();
    }

    async selectStuff(stuffName) {
        await this.page.waitForLoadState('load');
        await this.page.waitForSelector(this.stuffButtonSelector);
        await this.getStuffNameLinkLocator(stuffName).click();
        await this.page.waitForLoadState('load');
        await this.addToFavoritesButton.click();
        await this.page.waitForLoadState('load');
        expect(this.page.locator(this.favoritesDeleteButton)).toBeDefined();
    }

    async checkAdedStuff() {
        await this.page.waitForLoadState('load');
        expect(this.page.locator(this.addedFavoriteStuff)).toBeDefined();
    }
}