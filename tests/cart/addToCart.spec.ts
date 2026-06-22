import {test, expect} from '@playwright/test';

test('add to cart', async ({ page }) => {
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
    await page.getByRole('link', { name: 'Products' }).click();

    //search for a product
    await page.getByPlaceholder('Search Product').fill('Tshirt');
    await page.locator('#submit_search').click();

    //add product to cart
    await page.getByText('Add to cart').nth(1).click();

    //validate that product is added to cart
    await expect(page.getByText('Added!')).toBeVisible();

    //navigate to cart page
    await page.getByRole('link', {name: 'View Cart'}).click();

    //validate that product is displayed in the cart
    await expect(page.getByText('Rs. 400')).toBeVisible();


})