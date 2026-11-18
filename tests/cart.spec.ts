import { test, expect } from "../src/fixtures/test-fixtures";
import { products } from "../src/data/products";

test.describe("Inventory", { tag: "@inventory" }, () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.open();
  });

  test("TC-CRT-01: Cart shows the added items", async ({
    inventoryPage,
    cartPage,
    header,
  }) => {
    await inventoryPage.addProduct(products[0].name);
    await inventoryPage.addProduct(products[1].name);
    await header.openCart();

    await expect(cartPage.title).toHaveText("Your Cart");
    await expect(cartPage.item(products[0].name).name).toHaveText(
      products[0].name,
    );
    await expect(cartPage.item(products[0].name).price).toHaveText(
      products[0].price,
    );
    await expect(cartPage.item(products[0].name).quantity).toHaveText("1");

    await expect(cartPage.item(products[1].name).name).toHaveText(
      products[1].name,
    );
    await expect(cartPage.item(products[1].name).price).toHaveText(
      products[1].price,
    );
    await expect(cartPage.item(products[1].name).quantity).toHaveText("1");
  });

  test("TC-CRT-02: Remove an item in the cart", async ({
    inventoryPage,
    cartPage,
    header,
  }) => {
    await inventoryPage.addProduct(products[0].name);
    await inventoryPage.addProduct(products[1].name);
    await header.openCart();

    await expect(header.cartBadge).toHaveText("2");
    await expect(cartPage.item(products[0].name).name).toHaveText(
      products[0].name,
    );
    await expect(cartPage.item(products[1].name).name).toHaveText(
      products[1].name,
    );

    await cartPage.removeProduct(products[0].name);

    await expect(header.cartBadge).toHaveText("1");
    await expect(cartPage.item(products[0].name).name).not.toBeVisible();
    await expect(cartPage.item(products[1].name).name).toHaveText(
      products[1].name,
    );
  });

  test("TC-CRT-03: Continue Shopping", async ({
    inventoryPage,
    cartPage,
    header,
  }) => {
    await inventoryPage.addProduct(products[0].name);
    await header.openCart();
    await cartPage.continueShopping();

    await expect(inventoryPage.title).toHaveText("Products");
  });

  test("TC-CRT-04: Cart persists across navigation", async ({
    inventoryPage,
    cartPage,
    header,
  }) => {
    await inventoryPage.addProduct(products[0].name);
    await header.openCart();

    await expect(cartPage.item(products[0].name).name).toHaveText(
      products[0].name,
    );

    await inventoryPage.open();

    await expect(inventoryPage.title).toHaveText("Products");

    await header.openCart();

    await expect(cartPage.item(products[0].name).name).toHaveText(
      products[0].name,
    );
  });
});
