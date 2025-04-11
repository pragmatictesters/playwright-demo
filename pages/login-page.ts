import { expect, type Page, type Locator } from "@playwright/test";


export class LoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }
    async goto() {
        await this.page.goto("/");
    }
    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
    async assertErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }
    async assertScreenshot(name: string) {
        await expect(this.page).toHaveScreenshot(name, {
            maxDiffPixels: 200
        });
    }
    async clearUsername() {
        await this.username.clear();
    }
    async clearPassword() {
        await this.password.clear();
    }
    async fillUsername(username: string) {
        await this.username.fill(username);
    }
    async fillPassword(password: string) {
        await this.password.fill(password);
    }
    async clickLoginButton() {
        await this.loginButton.click();
    }
    async assertErrorMessageVisible() {
        await expect(this.errorMessage).toBeVisible();
    }

}