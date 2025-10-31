// tests/contracts.spec.ts
// learn this w3c accessilbe name computation spec 
//npx playwright test tests/contract.spec.ts
// tests/contract.spec.ts
//npx playwright codegen https://pcrsauto.com
//npx playwright test tests/contract.spec.ts --headed
// tests/contract.spec.ts


import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ContractExportPage } from '../pages/ContractExportPage';
import dotenv from 'dotenv';
// NOTE: Assuming you have a LoginPage.ts defined with navigate() and login() methods.

dotenv.config();

test('Monthly Contract Export Job: Navigation, Verification, and Search', async ({ page }) => {
    // --- Environment Variables ---
    const baseURL = process.env.BASE_URL!;
    const username = process.env.APP_USERNAME!;
    const password = process.env.APP_PASSWORD!;
    
    // --- Phase 1: Login ---
    const loginPage = new LoginPage(page, baseURL);
    await loginPage.navigate();
    await loginPage.login(username, password);

    // --- Phase 2: Navigation and Verification ---
    const contractExportPage = new ContractExportPage(page);
    
    // Step 1: Click the link and wait for the new form content to load
    await contractExportPage.navigateToContractExportView();

    // Step 2: Verify the page is ready and take a screenshot of the blank form
    await contractExportPage.verifyOnContractExportPage('1_blank_export_form');
    
    // --- Phase 3: Fill Form and Run Search ---
    // Example Dates: October 1st to October 30th, 2025
    await contractExportPage.fillAndRunSearch('10/01/2025', '10/30/2025');

    // Step 4: Verify the results are loaded (screenshot will capture the results)
   // await contractExportPage.verifyOnContractExportPage('2_searched_export_results');
   
});