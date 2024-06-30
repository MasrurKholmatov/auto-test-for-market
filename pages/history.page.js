import { BasePage } from './base.page';

const { expect } = require('@playwright/test');

export class HistoryPage extends BasePage {
    constructor(page) {
        super(page);
        this.titleText = page.locator('xpath=//h1[text()="Мои заказы"]');
        this.ordersHistoryList = page.locator('xpath=//ul[contains(@class, "OrdersHistoryItems_list")]');
        this.orderCount = page.locator('xpath=//ul[contains(@class, "OrdersHistoryItems_list")]/li');
        this.orderNumber = page.locator('xpath=//ul[contains(@class, "OrdersHistoryItems_list")]/li//h6');
        this.orderStatus = page.locator('xpath=//ul[contains(@class, "OrdersHistoryItems_list")]/li//*[contains(@class, "OrdersHistoryStatus")]');
        this.orderButton = page.locator('xpath=//ul[contains(@class, "OrdersHistoryItems_list")]/li/div//button[contains(@class, "ActionsMenuButton")]');
        this.orderDateDelivery = page.locator('xpath=//ul[contains(@class, "OrdersHistoryItems_list")]/li//*[contains(@class, "OrdersDeliveryDate")]');
    }

    async openOrders() {
        await this.page.waitForLoadState('load');
        await expect(this.titleText).toBeVisible();
    }

    async checkOrdersList() {
        await expect(this.ordersHistoryList).toBeVisible();
    }

    async checkOrdersData() {
        await this.orderCount.count();
        for (let i = 0; i < this.orderCount; i++) {
            await (await expect(this.orderNumber).nth(i)).toBeDefined();
            await (await expect(this.orderNumber).nth(i)).toHaveText(/Заказ \d+\.\d+\.\d+/gm);
            //проверка статуса заказов
            await (await expect(this.orderStatus).nth(i)).toBeDefined();
            await (await expect(this.orderStatus).nth(i)).toHaveText(/Выдан|Доставлен|Обработан, ожидает сборки|Отменен/gm);
            //проверка на содержание кнопки
            await (await expect(this.orderButton).nth(i)).toBeDefined();
            //проверка на содержание даты доставки
            await (await expect(this.orderDateDelivery).nth(i)).toBeDefined();
            await (await expect(this.orderDateDelivery).nth(i)).toHaveText(/Доставка \d+\ \W+\,\ \d+|—/gm);
        }
    }
}