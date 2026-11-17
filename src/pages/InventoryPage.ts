import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { InventoryItem } from "./components/InventoryItem";

export enum SortOption {
  NameAZ = "az",
  NameZA = "za",
  PriceLowHigh = "lohi",
  PriceHighLow = "hilo",
}

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly items: Locator;
  readonly sortSelect: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId("title");
    this.items = page.getByTestId("inventory-item");
    this.sortSelect = page.getByTestId("product-sort-container");
    this.itemNames = page.getByTestId("inventory-item-name");
    this.itemPrices = page.getByTestId("inventory-item-price");
  }

  async open(): Promise<void> {
    await this.goto("inventory.html");
  }

  item(name: string): InventoryItem {
    return new InventoryItem(this.items.filter({ hasText: name }));
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortSelect.selectOption(option);
  }

  async addProduct(name: string) {
    await this.item(name).addButton.click();
  }

  async removeProduct(name: string): Promise<void> {
    await this.item(name).removeButton.click();
  }

  async openProduct(name: string): Promise<void> {
    await this.item(name).name.click();
  }
}
