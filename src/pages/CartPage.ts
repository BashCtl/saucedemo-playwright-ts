import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CartItem } from "./components/CartItem";

export class CartPage extends BasePage {
  readonly title: Locator;
  readonly items: Locator;
  private readonly continueShoppingBtn: Locator;
  private readonly checkoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId("title");
    this.items = page.getByTestId("inventory-item");
    this.continueShoppingBtn = page.getByTestId("continue-shopping");
    this.checkoutBtn = page.getByTestId("checkout");
  }

  item(name: string): CartItem {
    return new CartItem(this.items.filter({ hasText: name }));
  }

  async removeProduct(name: string): Promise<void> {
    await this.item(name).removeButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingBtn.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutBtn.click();
  }
}
