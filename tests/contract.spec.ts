// tests/contracts.spec.ts

//npx playwright test tests/contract.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import dotenv from 'dotenv';

// Re-load dotenv here to ensure variables are available to the test worker.
dotenv.config(); 

// --- DIAGNOSTIC STEP ---
console.log(`\n--- ENV CHECK ---`);
console.log(`BASE_URL: ${process.env.BASE_URL}`);
console.log(`APP_USERNAME: ${process.env.APP_USERNAME}`);
console.log(`APP_PASSWORD: ${process.env.APP_PASSWORD ? 'Loaded' : 'MISSING!'}`); // Safer check for password
console.log(`-----------------\n`);

test('Monthly Contract Export Job: Login Phase', async ({ page }) => {
    
    // 1. Correctly retrieve variables using the names from your .env
    const baseURL = process.env.BASE_URL;
    const username = process.env.APP_USERNAME;
    const password = process.env.APP_PASSWORD;

    // 2. The Check (which is correctly failing)
    if (!baseURL || !username || !password) {
        // Now if this fails, the console.log above will tell us exactly which one is missing.
        throw new Error ('missing env variables: password, username, or baseURL');
    }

    // 3. Instantiate the Page Object using the full URL for now
    // NOTE: If you are relying on baseURL from config, you would pass 'Main/LoginPage.aspx' here.
    const loginPage = new LoginPage(page, baseURL); 

    // 4. Execute the login
    await loginPage.navigate();
    await loginPage.login(username, password);

    // ... rest of test ...
});