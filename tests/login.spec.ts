import { test, expect } from "../src/fixtures/test-fixtures";
import { users } from "../src/data/users";

test.describe("Login", { tag: "@login" }, () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test(
    "TC-LOG-01: should log in with a valid user",
    { tag: ["@smoke"] },
    async ({ loginPage, inventoryPage }) => {
      await loginPage.login(users.standard);

      await expect(inventoryPage.title).toHaveText("Products");
    },
  );

  test("TC-LOG-02: should show an error for a locked-out user", async ({
    loginPage,
  }) => {
    await loginPage.login(users.lockedOut);

    await expect(loginPage.errorBanner).toContainText("locked out");
  });

  test("TC-LOG-03: should show an error for a user with invalid password", async ({
    loginPage,
  }) => {
    await loginPage.login({ ...users.standard, password: "wrong_password" });

    await expect(loginPage.errorBanner).toContainText(
      "password do not match any user",
    );
  });

  test("TC-LOG-04: should show an error for a user with invalid username", async ({
    loginPage,
  }) => {
    await loginPage.login({ ...users.standard, username: "MadMax" });

    await expect(loginPage.errorBanner).toContainText(
      "do not match any user in this service",
    );
  });

  test("TC-LOG-05: should show an error for a user with empty username", async ({
    loginPage,
  }) => {
    await loginPage.login({ ...users.standard, username: "" });

    await expect(loginPage.errorBanner).toContainText("Username is required");
  });

  test("TC-LOG-06: should show an error for a user with empty password", async ({
    loginPage,
  }) => {
    await loginPage.login({ ...users.standard, password: "" });

    await expect(loginPage.errorBanner).toContainText("Password is required");
  });

  test("TC-LOG-07: Error banner can be dismissed", async ({ loginPage }) => {
    await loginPage.login({ ...users.standard, password: "" });

    await expect(loginPage.errorBanner).toContainText("Password is required");

    await loginPage.closeErrorBanner();

    await expect(loginPage.errorBanner).not.toBeVisible();
  });

  test("TC-LOG-08: should redirect to login when not logged in", async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto("/inventory.html");

    await expect(inventoryPage.title).not.toBeVisible();
  });
});
