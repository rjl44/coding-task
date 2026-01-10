import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("http://localhost:3000");

  const email = process.env.TEST_USER_EMAIL!;
  const password = process.env.TEST_USER_PASSWORD!;

  if (!email || !password) {
    throw new Error("Test user email or password not set in environment variables!");
  }

  await page.evaluate(
    ({ email, password }) => {
      localStorage.setItem(
        "users",
        JSON.stringify([{ email, password }])
      );
      localStorage.setItem("userEmail", email);
    },
    { email, password }
  );

  // Save storage state to a file
  await context.storageState({ path: "tests/state/storage.json" });
  await browser.close();
}

export default globalSetup;