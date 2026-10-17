import { test } from '@playwright/test';
import { LoginPage } from '../pages/oop.spec';

test('Login with OOP - successful login', async ({ page }) => {
    // Instantiate LoginPage
    const loginPage = new LoginPage(page);

    // Execute login flow
    await loginPage.navigateToHome();
    await loginPage.acceptConsent();
    await loginPage.navigateToLoginPage();
    await loginPage.login('Toto@yopmail.com', 'test1234');
    
    // Verify user is logged in
    await loginPage.verifyLoggedIn('toto1');
});

test('Login with OOP - test multiple credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToHome();
    await loginPage.acceptConsent();
    await loginPage.navigateToLoginPage();
    
    // Try different credentials
    await loginPage.login('user@example.com', 'password123');
    await loginPage.verifyLoggedIn('username');
});
