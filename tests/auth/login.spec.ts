import {test , expect} from '@playwright/test';

test('login', async ({ page }) => {
    //navigate to the web page
    await page.goto('https://automationexercise.com/');
    await page.getByRole('button', { name: 'Consent' }).click();

    //navigate to Login page
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    
    //login with correct username and password
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('Toto@yopmail.com');
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Password').fill('test1234');
    await page.getByRole('button', { name: 'Login'}).click();

    //verify that user is logged in
    await expect(page.getByText( 'Logged in as toto1')).toBeVisible();
});

