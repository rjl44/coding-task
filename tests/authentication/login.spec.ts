import { test } from "@playwright/test";
import { LoginPage } from "../pageObjects/logIn.po";
import { DashboardPage } from "../pageObjects/dashboard.po";

test("Login successful", async ({ page }) => {
    const email: string = process.env.TEST_USER_EMAIL as string;
    const password: string = process.env.TEST_USER_PASSWORD as string;

    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);
    await loginPage.clickLogin();

    const dashboardPage: DashboardPage = new DashboardPage(page);
    await dashboardPage.assertWelcomeTextVisible(email);
});

test("Login unsuccessful - invalid email", async ({ page }) => {
    const email: string = "invalid@email.com";
    const password: string = process.env.TEST_USER_PASSWORD as string;

    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);
    await loginPage.clickLogin();
    await loginPage.assertErrorVisible();
});

test("Login unsuccessful - invalid password", async ({ page }) => {
    const email: string = process.env.TEST_USER_EMAIL as string;
    const password: string = "invalid password";

    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);
    await loginPage.clickLogin();
    await loginPage.assertErrorVisible();
});
