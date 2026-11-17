import { test as setup, expect } from "../src/fixtures/test-fixtures";
import { users } from "../src/data/users";

const authFile = ".auth/standard-user.json";

setup(
  "authenticate as standard user",
  async ({ page, loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard);
    await expect(inventoryPage.title).toHaveText("Products"); // make sure login really worked

    await page.context().storageState({ path: authFile });
  },
);
