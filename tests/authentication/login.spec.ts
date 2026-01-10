import { test } from "../fixtures";

test("Login successful", async ({ loginPage, dashboardPage }) => {
    const email: string = process.env.TEST_USER_EMAIL as string;
    const password: string = process.env.TEST_USER_PASSWORD as string;

    await loginPage.goto();
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);
    await loginPage.clickLogin();

    await dashboardPage.assertWelcomeTextVisible(email);
});

test("Login unsuccessful - invalid email", async ({ loginPage }) => {
    const email: string = "invalid@email.com";
    const password: string = process.env.TEST_USER_PASSWORD as string;

    await loginPage.goto();
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);
    await loginPage.clickLogin();
    await loginPage.assertErrorVisible();
});

test("Login unsuccessful - invalid password", async ({ loginPage }) => {
    const email: string = process.env.TEST_USER_EMAIL as string;
    const password: string = "invalid password";

    await loginPage.goto();
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);
    await loginPage.clickLogin();
    await loginPage.assertErrorVisible();
});
