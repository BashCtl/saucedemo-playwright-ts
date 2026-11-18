import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CheckoutInfo } from "../data/checkout-info";

export class CheckoutInfoPage extends BasePage {
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly continueBtn: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByPlaceholder("First Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.postalCode = page.getByPlaceholder("Zip/Postal Code");
    this.continueBtn = page.getByRole("button", { name: "Continue" });
    this.error = page.locator('[data-test="error"]');
  }

  async fillInfo(info: CheckoutInfo) {
    await this.firstName.fill(info.firstName);
    await this.lastName.fill(info.lastName);
    await this.postalCode.fill(info.postalCode);
  }

  async continue() {
    await this.continueBtn.click();
  }
}
