import {test, expect} from '@playwright/test';

test('search product', async ({ page}) => {
    //navigate to the web page
    await page.goto('https://automationexercise.com/');
    await page.getByRole('button', { name: 'Consent' }).click();


    // navigate to login page
    await page.getByRole('link', {name: ' Signup / Login'}).click();

    //login with correct username and password
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('Toto@yopmail.com');
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Password').fill('test1234');
    await page.getByRole('button', { name: 'Login'}).click();

    //verify that user is logged in
    await expect(page.getByText( 'Logged in as toto1')).toBeVisible();

    //navigate to products page
    await page.getByRole('link', {name: ' Products'}).click();

    //search for product
    await page.getByPlaceholder('Search Product').fill('Shirt');
    await page.locator('#submit_search').click();

    //verify that searched product is visible
    await expect(page.getByText('Men Tshirt').nth(2)).toBeVisible();
    
});