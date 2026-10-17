import { Page, expect } from '@playwright/test';

// Page Object Model for Login
export class LoginPage {
    constructor(private page: Page) {}

    // Selectors
    private emailInput = () => this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
    private passwordInput = () => this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Password');
    private loginButton = () => this.page.getByRole('button', { name: 'Login' });
    private signupLoginLink = () => this.page.getByRole('link', { name: ' Signup / Login' });
    private consentButton = () => this.page.getByRole('button', { name: 'Consent' });
    private loggedInText = (username: string) => this.page.getByText(`Logged in as ${username}`);

    // Methods
    async navigateToHome() {
        await this.page.goto('https://automationexercise.com/');
    }

    async acceptConsent() {
        await this.consentButton().click();
    }

    async navigateToLoginPage() {
        await this.signupLoginLink().click();
    }

    async login(email: string, password: string) {
        await this.emailInput().fill(email);
        await this.passwordInput().fill(password);
        await this.loginButton().click();
    }

    async verifyLoggedIn(username: string) {
        await expect(this.loggedInText(username)).toBeVisible();
    }
}