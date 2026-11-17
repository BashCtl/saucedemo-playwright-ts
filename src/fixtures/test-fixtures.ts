import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { Header } from "../pages/components/Header";

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  header: Header;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  header: async ({ page }, use) => use(new Header(page)),
});

export { expect };
