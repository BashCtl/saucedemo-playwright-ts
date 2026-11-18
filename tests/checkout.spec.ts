import { test, expect } from "../src/fixtures/test-fixtures";
import { products } from "../src/data/products";
import { createCheckoutInfo } from "../src/data/checkout-info";
import { calculateOrderTotals, formatCents } from "../src/utils/money";

test.describe("Checkout", { tag: "@checkout" }, () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.open();
  });

  test(
    "TC-CHK-01: Complete a purchase end to end",
    { tag: ["@smoke"] },
    async ({
      inventoryPage,
      cartPage,
      header,
      checkoutInfoPage,
      checkoutOverviewPage,
      checkoutCompletePage,
    }) => {
      await inventoryPage.addProduct(products[0].name);
      await header.openCart();
      await cartPage.proceedToCheckout();
      await checkoutInfoPage.fillInfo(createCheckoutInfo());
      await checkoutInfoPage.continue();
      await checkoutOverviewPage.finish();

      await expect(checkoutCompletePage.title).toHaveText(
        "Checkout: Complete!",
      );
    },
  );

  test("TC-CHK-02: First name is required", async ({
    inventoryPage,
    cartPage,
    header,
    checkoutInfoPage,
  }) => {
    let checkoutInfo = createCheckoutInfo({ firstName: "" });
    await inventoryPage.addProduct(products[0].name);
    await header.openCart();
    await cartPage.proceedToCheckout();
    await checkoutInfoPage.fillInfo(checkoutInfo);
    await checkoutInfoPage.continue();

    await expect(checkoutInfoPage.error).toHaveText(
      "Error: First Name is required",
    );
  });

  test("TC-CHK-03: Last name is required", async ({
    inventoryPage,
    cartPage,
    header,
    checkoutInfoPage,
  }) => {
    let checkoutInfo = createCheckoutInfo({ lastName: "" });
    await inventoryPage.addProduct(products[0].name);
    await header.openCart();
    await cartPage.proceedToCheckout();
    await checkoutInfoPage.fillInfo(checkoutInfo);
    await checkoutInfoPage.continue();

    await expect(checkoutInfoPage.error).toHaveText(
      "Error: Last Name is required",
    );
  });

  test("TC-CHK-04: Postal code is required", async ({
    inventoryPage,
    cartPage,
    header,
    checkoutInfoPage,
  }) => {
    let checkoutInfo = createCheckoutInfo({ postalCode: "" });
    await inventoryPage.addProduct(products[0].name);
    await header.openCart();
    await cartPage.proceedToCheckout();
    await checkoutInfoPage.fillInfo(checkoutInfo);
    await checkoutInfoPage.continue();

    await expect(checkoutInfoPage.error).toHaveText(
      "Error: Postal Code is required",
    );
  });

  test("TC-CHK-05: Overview shows correct items and totals", async ({
    inventoryPage,
    header,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
  }) => {
    const selectedProducts = products.slice(0, 2);
    const { itemTotal, tax, total } = calculateOrderTotals(
      selectedProducts.map((p) => p.price),
    );

    for (const product of selectedProducts) {
      await inventoryPage.addProduct(product.name);
    }
    await header.openCart();
    await cartPage.proceedToCheckout();
    await checkoutInfoPage.fillInfo(createCheckoutInfo());
    await checkoutInfoPage.continue();

    await expect(checkoutOverviewPage.title).toHaveText("Checkout: Overview");
    await expect(checkoutOverviewPage.itemNames).toHaveText(
      selectedProducts.map((p) => p.name),
    );
    await expect(checkoutOverviewPage.itemPrices).toHaveText(
      selectedProducts.map((p) => p.price),
    );
    await expect(checkoutOverviewPage.itemTotal).toHaveText(
      `Item total: ${formatCents(itemTotal)}`,
    );
    await expect(checkoutOverviewPage.tax).toHaveText(
      `Tax: ${formatCents(tax)}`,
    );
    await expect(checkoutOverviewPage.total).toHaveText(
      `Total: ${formatCents(total)}`,
    );
  });
});
