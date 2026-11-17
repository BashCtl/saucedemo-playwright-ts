import { Locator } from "@playwright/test";

export class InventoryItem {
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly image: Locator;
  readonly addButton: Locator;
  readonly removeButton: Locator;

  constructor(root: Locator) {
    this.name = root.getByTestId("inventory-item-name");
    this.description = root.getByTestId("inventory-item-desc");
    this.price = root.getByTestId("inventory-item-price");
    this.image = root.locator("img");
    this.addButton = root.getByRole("button", { name: "Add to cart" });
    this.removeButton = root.getByRole("button", { name: "Remove" });
  }
}
