// pages/ContractExportPage.ts

// pages/ContractExportPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class ContractExportPage {
  readonly page: Page;
  readonly contractExportNavLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contractExportNavLink = page.locator('a', { hasText: '• Contract Export' });
  }

  /**
   * Navigates to the Contract Export view by clicking the left menu link
   * and waits for the correct tab to become active.
   */
  async navigateToContractExportView(): Promise<void> {
    console.log(' Navigating to Contract Export tab...');

    await this.contractExportNavLink.click();

    const activeTab = this.page.locator('li.dxtc-activeTab', { hasText: 'Contract Export' });
    await activeTab.waitFor({ state: 'visible', timeout: 15000 });

    console.log(' Contract Export tab is active and visible.');
    

  }

  /**
   * Checks whether the Contract Export tab is currently active.
   * This ok for now but to make it more robust I need to add a specific element
   */
  async isExportViewReady(): Promise<boolean> {
    const activeTab = this.page.locator('li.dxtc-activeTab', { hasText: 'Contract Export' });
    return activeTab.isVisible();
  }

  /**
   * A reusable assertion that confirms the user is on the right page.
   */
  async verifyOnContractExportPage(): Promise<void> {
    const isReady = await this.isExportViewReady();
    expect(isReady, 'Contract Export tab should be active').toBeTruthy();
  }
}
