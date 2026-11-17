import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly items: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId("title");
    this.items = page.getByTestId("inventory-item");
  }
}
