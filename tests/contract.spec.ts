// tests/contracts.spec.ts
// learn this w3c accessilbe name computation spec 
//npx playwright test tests/contract.spec.ts
// tests/contract.spec.ts


// tests/contract.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ContractExportPage } from '../pages/ContractExportPage';
import dotenv from 'dotenv';

dotenv.config();

test('Monthly Contract Export Job: Login Phase', async ({ page }) => {
  const baseURL = process.env.BASE_URL!;
  const username = process.env.APP_USERNAME!;
  const password = process.env.APP_PASSWORD!;

  // Step 1: Login
  const loginPage = new LoginPage(page, baseURL);
  await loginPage.navigate();
  await loginPage.login(username, password);

  // Step 2: Go to Contract Export
  const contractExportPage = new ContractExportPage(page);
  await contractExportPage.navigateToContractExportView();

  // Step 3: Verify we are on the correct tab (encapsulated in page object)
  await contractExportPage.verifyOnContractExportPage();
  await page.screenshot({ path: 'screenshots/full_page.png', fullPage: true });

  
});
