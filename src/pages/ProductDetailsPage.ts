import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductDetailsPage extends BasePage {
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly image: Locator;
  private readonly addButton: Locator;
  readonly removeButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    super(page);
    this.name = page.getByTestId("inventory-item-name");
    this.description = page.getByTestId("inventory-item-desc");
    this.price = page.getByTestId("inventory-item-price");
    this.image = page.locator("img.inventory_details_img");
    this.addButton = page.getByTestId('add-to-cart');
    this.removeButton = page.getByTestId('remove');
    this.backButton = page.getByTestId("back-to-products");
  }

  async addToCart(): Promise<void> {
    await this.addButton.click();
  }

  async backToProducts(): Promise<void> {
    await this.backButton.click();
  }
}
