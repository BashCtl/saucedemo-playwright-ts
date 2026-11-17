import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { User } from "../data/users";

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginBtn: Locator;
  readonly errorBanner: Locator;
  readonly closeErrorBannerBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByTestId("username");
    this.passwordInput = page.getByTestId("password");
    this.loginBtn = page.getByTestId("login-button");
    this.errorBanner = page.getByTestId("error");
    this.closeErrorBannerBtn = page.getByTestId("error-button");
  }

  async open(): Promise<void> {
    await this.goto("/");
  }

  async login(user: User): Promise<void> {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginBtn.click();
  }

  async closeErrorBanner(): Promise<void> {
    await this.closeErrorBannerBtn.click();
  }
}
