import { Locator, Page } from "@playwright/test";
import { get } from "http";


export class InventoryPage {
    readonly page: Page;
    readonly pageHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeader = page.getByTestId("title");
    }

    async getPageHeader() {
        return await this.pageHeader.innerText();
    }

}