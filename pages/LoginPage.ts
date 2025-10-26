// pages/LoginPage.ts

import { Page, Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly relativePath: string; // Renamed from 'url' to 'relativePath' for clarity

    // defining locators (These look good, assuming 'Email' and 'Password' are the accessible names)
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    // We now accept the specific relative path to the login page (e.g., 'Main/LoginPage.aspx')
    constructor(page: Page, relativePath: string) {
        this.page = page;
        this.relativePath = relativePath;
        
        // Locators are defined here:
        this.usernameField = page.getByRole("textbox", { name: "Email" });
        this.passwordField = page.getByRole("textbox", { name: "Password" });
        this.loginButton = page.getByRole("button", { name: "Log In" });
    }

    /**
     * Navigates to the login page using the baseURL set in the Playwright config.
     */
    async navigate() {
        // Playwright prepends the configured baseURL to the relativePath
        console.log("Navigating to login path:", this.relativePath);
        await this.page.goto(this.relativePath, { waitUntil: "domcontentloaded" });
    }

    /**
     * Fills out the form and waits for the successful redirect to the main page.
     */
    async login(username: string, password: string) {
        console.log("Attempting to log in with provided credentials...");

        // 1. Set up the expected outcome (the navigation/URL change)
        const navigationPromise = this.page.waitForURL(/.*MainPage\.aspx.*/, { timeout: 30000 });
        
        // 2. Perform all necessary actions simultaneously for speed
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        
        // 3. Click the button and wait for the navigation promise to resolve
        await Promise.all([
             navigationPromise, // Wait for the expected URL change
             this.loginButton.click(), // Click to trigger the change
        ]);

        console.log("Login successful. Now on main page.");
    }
}