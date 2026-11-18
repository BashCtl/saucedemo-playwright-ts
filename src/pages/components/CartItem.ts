import { Locator } from "@playwright/test";

export class CartItem {
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly quantity: Locator;
  readonly removeButton: Locator;

  constructor(root: Locator) {
    this.name = root.getByTestId("inventory-item-name");
    this.description = root.getByTestId("inventory-item-desc");
    this.price = root.getByTestId("inventory-item-price");
    this.quantity = root.getByTestId("item-quantity");
    this.removeButton = root.getByRole("button", { name: "Remove" });
  }
}
