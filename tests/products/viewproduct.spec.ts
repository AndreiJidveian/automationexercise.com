import {test , expect} from '@playwright/test';

test('login and view product', async ({ page }) => {
    //navigate to the web page
    await page.goto('https://automationexercise.com/');
    await page.getByRole('button', { name: 'Consent' }).click();

    //navigate to Login page
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    
    //login with correct username and password
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('Toto@yopmail.com');
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Password').fill('test1234');
    await page.getByRole('button', { name: 'Login'}).click();

    //verify that user is logged in
    await expect(page.getByText( 'Logged in as toto1')).toBeVisible();

    // MODIFICARE: click pe View Product specific pentru produsul de Rs. 1050
    await page.locator('.product-image-wrapper')
        .filter({ has: page.locator('h2', { hasText: '1050' }) })
        .getByRole('link', { name: 'View Product' })
        .click();

    // Verify correct product
    await expect(page.getByText('Sleeveless Unicorn Patch Gown - Pink')).toBeVisible();
});