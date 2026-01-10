import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly welcomeHeading: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeHeading = page.getByRole("heading", { name: "Welcome" });
        this.logoutButton = page.getByRole("button", { name: "Logout" });
    }

    async assertWelcomeTextVisible(email: string): Promise<void> {
        await expect(this.welcomeHeading).toBeVisible();
        await expect(this.page.getByText(email)).toBeVisible();
    }

    async clickLogout(): Promise<void> {
        await this.logoutButton.click();
    }
}
