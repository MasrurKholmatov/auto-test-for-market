const { expect } = require('@playwright/test');
import { BasePage } from './base.page';

export class NotebooksPage extends BasePage {
    constructor(page) {
        super(page);
        this.modelFilter = page.locator('xpath=//button[@data-testid="producer-msi"]');
        this.modelFilterCheckBox = page.locator('xpath=//button[@data-testid="producer-msi" and @aria-pressed = "true"]');
        this.notebookTypeFilter = page.locator('xpath=//button//*[text()="игровой (геймерский)"]');
        this.notebookTypeFilterCheckBox = page.locator('xpath=//button[ @aria-pressed = "true"]//*[text() = "игровой (геймерский)"]');
        this.videocardFilter = page.locator('xpath=//button//*[text()="дискретная"]');
        this.videocardFilterCheckBox = page.locator('xpath=//button[ @aria-pressed = "true"]//*[text()="дискретная"]');
        // this.applyFiltersButton = page.locator('xpath=//button[@data-testid="apply-products-filters"]');
    }

    // тут будут фильтры и всё
    async selectNotebookFilters() {
        const filtersResult = 'Игровой ноутбук MSI';
        await this.modelFilter.click();
        expect(this.modelFilterCheckBox).toBeDefined();
        await this.notebookTypeFilter.click();
        expect(this.notebookTypeFilterCheckBox).toBeDefined();
        await this.videocardFilter.click();
        expect(this.videocardFilterCheckBox).toBeDefined();
        // await this.applyFiltersButton.click();
        expect(this.page.getByText(filtersResult)).toBeDefined();
    }
}