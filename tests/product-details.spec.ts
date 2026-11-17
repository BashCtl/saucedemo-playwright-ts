import { test, expect } from "../src/fixtures/test-fixtures";
import { products, sortedProduts } from "../src/data/products";

test.describe("Inventory", { tag: "@inventory" }, () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.open();
  });

  test("TC-PRD-01: should open product details from the list", async ({
    inventoryPage,
    productDetailsPage,
  }) => {
    const product = products[0];

    await inventoryPage.openProduct(product.name);

    await expect(productDetailsPage.backButton).toBeVisible();
    await expect(productDetailsPage.name).toHaveText(product.name);
    await expect(productDetailsPage.price).toHaveText(product.price);
    await expect(productDetailsPage.description).not.toBeEmpty();
  });

  test("TC-PRD-02: should add to cart from the details page", async ({
    inventoryPage,
    productDetailsPage,
    header,
  }) => {
    await inventoryPage.openProduct(products[0].name);
    await productDetailsPage.addToCart();

    await expect(productDetailsPage.removeButton).toBeVisible();
    await expect(header.cartBadge).toHaveText("1");
  });

  test("TC-PRD-03: should be able back to inventory page", async ({
    inventoryPage,
    productDetailsPage,
  }) => {
    await inventoryPage.openProduct(products[0].name);
    await productDetailsPage.backToProducts();

    await expect(inventoryPage.title).toHaveText("Products");
  });
});
