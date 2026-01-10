import { test as base } from '@playwright/test';
import { LoginPage } from './pageObjects/logIn.po';
import { DashboardPage } from './pageObjects/dashboard.po';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
    dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});

export { expect } from '@playwright/test';