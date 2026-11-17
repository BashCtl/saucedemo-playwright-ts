import { Locator, Page } from "@playwright/test";

export class Header {
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;
  private readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.menuButton = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.getByTestId("logout-sidebar-link");
    this.cartLink = page.getByTestId("shopping-cart-link");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
