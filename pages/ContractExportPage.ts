import { Page, Locator, expect } from '@playwright/test';

const SEARCH_MESSAGE_TEXT = 'Please use search criteria above to find desired records';

export class ContractExportPage {
    readonly page: Page;
    readonly contractExportNavLink: Locator;
    readonly resultsMessage: Locator; 
    
    readonly activationDateStartField: Locator; 
    readonly activationDateEndField: Locator; 
    
    readonly refreshButton: Locator;
    readonly contractExportButton: Locator;
    readonly actualExportButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Navigation Link
        this.contractExportNavLink = page.locator('a:has-text("• Contract Export")');

        //  Define a frameLocator (lazy and reliable)
        const contentFrame = page.frameLocator('#ContentPlaceHolder1_tabPages_frContent1');

        // --- Verification Locator ---
        this.resultsMessage = contentFrame.locator(`text="${SEARCH_MESSAGE_TEXT}"`);

        // --- Date Fields ---
        this.activationDateStartField = contentFrame.locator('#grdList_header7_colFilter_7_dtValue1_7');
        this.activationDateEndField = contentFrame.locator('#grdList_header7_colFilter_7_dtValue2_7');

        // --- Buttons ---
        this.refreshButton = contentFrame.locator('#btnRefresh_CD');
        this.contractExportButton = page.getByRole('button', { name: 'Contract Export' });
        this.actualExportButton = contentFrame.locator('div[id$="_CD"]:has-text("Contract Export")');
    }

    async navigateToContractExportView(): Promise<void> {
        console.log(' Navigating to Contract Export tab...');
        await this.contractExportNavLink.click();
        await expect(this.resultsMessage).toBeVisible({ timeout: 15000 });
        console.log(' Contract Export form is loaded and ready.');
    }

    async isExportViewReady(): Promise<boolean> {
        return this.resultsMessage.isVisible();
    }

    async verifyOnContractExportPage(screenshotName: string): Promise<void> {
        await expect(this.resultsMessage).toBeVisible({ timeout: 10000 });
        console.log('Verification successful: Unique form content is visible.');
        await this.page.screenshot({ 
            path: `test-results/screenshots/${screenshotName}.png`,
            fullPage: true 
        });
        console.log(`Screenshot saved: test-results/screenshots/${screenshotName}.png`);
    }

    async fillAndRunSearch(startDate: string, endDate: string): Promise<void> {
        console.log(`Setting Activation Date range from ${startDate} to ${endDate}...`);

        await this.activationDateStartField.click();
        await this.activationDateStartField.fill(startDate);

        await this.activationDateEndField.click();
        await this.activationDateEndField.fill(endDate);

        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);

        await this.refreshButton.click();
        await this.page.waitForTimeout(500);

        await this.actualExportButton.click();
        console.log('Search initiated via Refresh button.');
        
    }
}
