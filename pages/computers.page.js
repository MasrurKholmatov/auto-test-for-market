import { BasePage } from './base.page';

const { expect } = require('@playwright/test');

export class ComputersPage extends BasePage {
    constructor(page) {
        super(page);
        this.notebooksPage = page.locator('xpath=//ul[contains(@class, "b-cloud")]//a[text()="Ноутбуки"]');
    }

    async selectNotebooksCategory() {
        await this.notebooksPage.click();
        await this.page.waitForLoadState('load');
        await expect(this.page).toHaveURL('/notebooks/');
    }
}