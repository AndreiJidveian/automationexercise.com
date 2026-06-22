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
    await expect(page.locator('.modal.show .modal-title')).toBeVisible();


    //navigate to cart page
    await page.getByRole('link', {name: 'View Cart'}).click();

    //validate that product is displayed in the cart
    await expect(page.getByText('Rs. 400')).toBeVisible();

    //navigate to checkout page
    await page.getByText('Proceed To Checkout').click();

    //validate that user is on checkout page
    await expect(page.getByText('Review Your Order')).toBeVisible();

    //execute checkout process
    await page.getByRole('link', { name: 'Place Order' }).click();

    //validate that user navigate to the payment page
    await expect(page.getByText('Name on Card')).toBeVisible();

    //input a name on the card
    await page.locator('input[name="name_on_card"]').fill('Ion Popescu');

    //input a card number
    await page.locator('input[name="card_number"]').fill('1234 5678 9012 3456');

    //input a cvv
    await page.locator('input[name="cvc"]').pressSequentially('123');

    //input a expiration date
    await page.locator('input[name="expiry_month"]').pressSequentially('12');
    await page.locator('input[name="expiry_year"]').pressSequentially('2029');

    //click on pay button
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

    //validate that purchas is done succesfully
    await expect(page.getByText('Order Placed!')).toBeVisible();

});
