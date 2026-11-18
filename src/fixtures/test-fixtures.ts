import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { Header } from "../pages/components/Header";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { CartPage } from "../pages/CartPage";

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  header: Header;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  header: async ({ page }, use) => use(new Header(page)),
  productDetailsPage: async ({ page }, use) =>
    use(new ProductDetailsPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
});

export { expect };
