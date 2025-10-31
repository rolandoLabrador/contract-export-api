// pages/ContractExportPage.ts
// pages/ContractExportPage.ts

import { Page, Locator, expect } from '@playwright/test';

// Define the unique message text for content verification
const SEARCH_MESSAGE_TEXT = 'Please use search criteria above to find desired records';

export class ContractExportPage {
    readonly page: Page;
    readonly contractExportNavLink: Locator;
    readonly resultsMessage: Locator; 
    
    // Locators for the date range inputs (Start and End)
    readonly contentIframe: Locator;
    readonly activationDateStartField: Locator; 
    readonly activationDateEndField: Locator; 
    
    // Locators for the functional elements
    readonly refreshButton: Locator;
    readonly contractExportButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        
        // Navigation Link (FIXED: Using cleaner text selector)
        this.contractExportNavLink = page.locator('a:has-text("• Contract Export")');
        
        // Define the content frame first
        this.contentIframe = page.locator('#ContentPlaceHolder1_tabPages_frContent1');
        
        // --- Verification Locator (Inside the iframe) ---
        this.resultsMessage = this.contentIframe.contentFrame().locator(`text="${SEARCH_MESSAGE_TEXT}"`);

        // --- Date Field Locators (Inside the iframe) ---
        this.activationDateStartField = this.contentIframe.contentFrame().locator('#grdList_header7_colFilter_7_dtValue1_7');
        this.activationDateEndField = this.contentIframe.contentFrame().locator('#grdList_header7_colFilter_7_dtValue2_7'); 
        
        // --- Button Locators ---
        // FIX for Visibility/Timeout: Target the clickable PARENT DIV element (ID: #btnRefresh_CD).
        this.refreshButton = this.contentIframe.contentFrame().locator('#btnRefresh_CD');
        
        this.contractExportButton = page.getByRole('button', { name: 'Contract Export' });
    }

    /**
     * Navigates to the Contract Export view by clicking the left menu link
     * and waits for the correct content to load.
     */
    async navigateToContractExportView(): Promise<void> {
        console.log(' Navigating to Contract Export tab...');

        await this.contractExportNavLink.click();
        
        // Wait for the unique content/form to be visible (most robust check)
        await expect(this.resultsMessage).toBeVisible({ timeout: 15000 });

        console.log(' Contract Export form is loaded and ready.');
    }

    /**
     * Checks whether the unique form content is present.
     */ 
    async isExportViewReady(): Promise<boolean> {
        return this.resultsMessage.isVisible(); 
    }

    /**
     * A reusable assertion that confirms the user is on the right page AND takes a screenshot.
     * @param screenshotName The base name for the screenshot file.
     */
    async verifyOnContractExportPage(screenshotName: string): Promise<void> {
        
        // 1. Assert the unique content is visible (strongest confirmation)
        await expect(this.resultsMessage).toBeVisible({ timeout: 10000 });
        console.log('Verification successful: Unique form content is visible.');

        // 2. Take a screenshot of the entire page
        await this.page.screenshot({ 
            path: `test-results/screenshots/${screenshotName}.png`,
            fullPage: true 
        });
        console.log(`Screenshot saved: test-results/screenshots/${screenshotName}.png`);
    }

    /**
     * Fills the Activation Date range and runs the search.
     */
    async fillAndRunSearch(startDate: string, endDate: string): Promise<void> {
        console.log(`Setting Activation Date range from ${startDate} to ${endDate}...`);
        
        await this.activationDateStartField.click();
        await this.activationDateStartField.fill(startDate);
        
        await this.activationDateEndField.click();
        await this.activationDateEndField.fill(endDate);
        
        // --- FIX: Stability Steps Added ---
        // 1. Press Escape to ensure any calendar/picker UI is closed.
        await this.page.keyboard.press('Escape');
        // 2. Short wait to let the UI stabilize before attempting the button click.
        await this.page.waitForTimeout(500); 
        // ---------------------------------
        //await this.page.pause(); // Retaining pause for potential future debugging
        await this.refreshButton.click();
        console.log('Search initiated via Refresh button.');
    }
}