import { test, expect } from "../src/fixtures/test-fixtures";
import { users } from "../src/data/users";
import { products, sortedProduts } from "../src/data/products";
import { SortOption } from "../src/pages/InventoryPage";

test.describe("Inventory", { tag: "@inventory" }, () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.open();
  });

  test(
    "TC-INV-01: Product list shows all products",
    { tag: "@smoke" },
    async ({ inventoryPage }) => {
      await expect(inventoryPage.title).toHaveText("Products");
      await expect(inventoryPage.items).toHaveCount(products.length);

      for (const product of products) {
        await test.step(product.name, async () => {
          const item = inventoryPage.item(product.name);
          await expect(item.name).toHaveText(product.name);
          await expect(item.price).toHaveText(product.price);
          await expect(item.description).toHaveText(product.description);
          await expect(item.image).toBeVisible();
          await expect(item.addButton).toBeVisible();
        });
      }
    },
  );

  test("TC-INV-02: should sort products by name A to Z", async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy(SortOption.NameZA); // move away from the default first
    await inventoryPage.sortBy(SortOption.NameAZ);

    await expect(inventoryPage.itemNames).toHaveText(sortedProduts.namesAZ);
  });

  test("TC-INV-03: should sort products by name Z to A", async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy(SortOption.NameZA);

    await expect(inventoryPage.itemNames).toHaveText(sortedProduts.namesZA);
  });

  test("TC-INV-04: should sort products by price low to high", async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy(SortOption.PriceLowHigh);

    await expect(inventoryPage.itemPrices).toHaveText(
      sortedProduts.pricesLowToHigh,
    );
  });

  test("TC-INV-05: should sort products by price high to low", async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy(SortOption.PriceHighLow);

    await expect(inventoryPage.itemPrices).toHaveText(
      sortedProduts.pricesHighToLow,
    );
  });

  test("TC-INV-06: should be able to add one product to cart", async ({
    inventoryPage,
    header,
  }) => {
    await inventoryPage.addProduct(products[0].name);

    await expect(header.cartBadge).toHaveText("1");
  });

  test("TC-INV-07: should be able to add several products to cart", async ({
    inventoryPage,
    header,
  }) => {
    await inventoryPage.addProduct(products[0].name);
    await inventoryPage.addProduct(products[1].name);
    await inventoryPage.addProduct(products[2].name);

    await expect(header.cartBadge).toHaveText("3");
  });

  test("TC-INV-08: should be able to remove added product", async ({
    inventoryPage,
    header,
  }) => {
    await inventoryPage.addProduct(products[0].name);
    await expect(header.cartBadge).toHaveText("1");

    await inventoryPage.removeProduct(products[0].name);
    await expect(header.cartBadge).not.toBeVisible();
  });
});
