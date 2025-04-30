import { Page, Locator, expect } from '@playwright/test';

export class HomeRequestaquotePage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly serviceSelect: Locator;
  readonly messageTextarea: Locator;
  readonly submitButton: Locator;
  readonly formStatus: Locator;
  readonly subscriptionForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('input[id="name"]');
    this.emailInput = page.locator('input[id="email"]');
    this.serviceSelect = page.locator('select[id="service"]');
    this.messageTextarea = page.locator('textarea[id="message"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.formStatus = page.locator('div[id="formStatus"]');
    this.subscriptionForm = page.locator('form[id="subscriptionForm"]');
  }

  async goto() {
    await this.page.goto('https://qatest.datasub.com/');
  }

  async gotoAndScrollToForm() {
    await this.goto();
    await this.subscriptionForm.scrollIntoViewIfNeeded();
    await this.page.waitForSelector('form[id="subscriptionForm"]', { state: 'visible' });
  }

  async fillForm(data: {
    name: string;
    email: string;
    service: string;
    message: string;
  }) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.serviceSelect.selectOption(data.service);
    await this.messageTextarea.fill(data.message);
  }

  async submitForm() {
    await this.submitButton.first().click();
  }

  async expectSuccessMessage() {
    await expect(this.formStatus).toBeVisible();
    await expect(this.formStatus).toHaveClass(/mt-2 text-success/);
  }

  async expectErrorMessage() {
    await expect(this.formStatus).not.toBeVisible();
  }

  async getEmailValidationMessage(): Promise<string> {
    return this.emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
  }

}
