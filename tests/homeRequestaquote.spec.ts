import { test, expect } from '@playwright/test';
import { HomeRequestaquotePage } from './pages/homeRequestaquote.page.ts';

test.describe('Quote Form Tests', () => {
  let quotePage: HomeRequestaquotePage;

  test.beforeEach(async ({ page }) => {
    quotePage = new HomeRequestaquotePage(page);
    await quotePage.gotoAndScrollToForm();
  });

  test('happy path - form submission with valid data', async () => {
    await quotePage.fillForm({
      name: 'John Doe',
      email: 'john.doe@example.com',
      service: 'Select B Service',
      message: 'Test message for quote request'
    });

    await quotePage.submitForm();
    await quotePage.expectSuccessMessage();
  });

  test('negative case - form submission with invalid data', async () => {
    await quotePage.fillForm({
      name: 'John Doe',
      email: 'invalid-email',
      service: 'Select B Service',
      message: 'Test message'
    });

    await quotePage.submitForm();
    await quotePage.expectErrorMessage();

    const validationMessage = await quotePage.getEmailValidationMessage();
    expect(validationMessage).toBeTruthy();
  });
});
