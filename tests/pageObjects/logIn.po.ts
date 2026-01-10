import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole("heading", { name: "Login" });
        this.emailInput = page.getByRole("textbox", { name: "Email" });
        this.passwordInput = page.getByRole("textbox", { name: "Password" });
        this.loginButton = page.getByRole("button", { name: "Login" });
    }

    async goto(): Promise<void> {
        await this.page.goto("/login");
        await this.assertPageHeadingVisible();
    }

    async assertPageHeadingVisible(): Promise<void> {
        await expect(this.heading).toBeVisible();
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }

    async assertErrorVisible(): Promise<void> {
        await expect(this.page.getByText("Invalid email or password"))
            .toBeVisible();
    }
}
