import { test } from "../fixtures";

test("Logout successful", async ({ loginPage, dashboardPage }) => {
    const email: string = process.env.TEST_USER_EMAIL as string;
    const password: string = process.env.TEST_USER_PASSWORD as string;

    await loginPage.goto();
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);
    await loginPage.clickLogin();

    await dashboardPage.logoutButton.click();

    await loginPage.assertPageHeadingVisible();
});
