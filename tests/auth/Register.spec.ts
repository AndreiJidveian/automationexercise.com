import { test, expect } from '@playwright/test';

test('register', async ({ page }) => {

    // email unic la fiecare rulare - fix pentru "email already exists"
    const email = `useru${Date.now()}@yopmail.com`;

    // navigate to the web page
    await page.goto('https://automationexercise.com/');
    const consent = page.getByRole('button', { name: 'Consent' });
    if (await consent.isVisible().catch(() => false)) await consent.click();

    // navigate to register/login page
    await page.getByRole('link', { name: /Signup \/ Login/i }).click();

    // create the account
    await page.locator('[data-qa="signup-name"]').fill('useru15');
    await page.locator('[data-qa="signup-email"]').fill(email);
    await page.getByRole('button', { name: 'Signup', exact: true }).click();
    await page.waitForURL('**/signup'); // asteapta pagina cu formularul

    // fill the details of the account
    await page.locator('#id_gender1').check();
    await page.locator('[data-qa="password"]').fill('test14');
    await page.locator('[data-qa="days"]').selectOption('10');
    await page.locator('[data-qa="months"]').selectOption('5'); // numeric - mai stabil
    await page.locator('[data-qa="years"]').selectOption('2000');

    // address details information
    await page.locator('[data-qa="first_name"]').fill('TestUser12');
    await page.locator('[data-qa="last_name"]').fill('Test2');
    await page.locator('[data-qa="address"]').fill('str. Prieteniei nr. 29');
    await page.locator('[data-qa="country"]').selectOption('Singapore');
    await page.locator('[data-qa="state"]').fill('Sighet');
    await page.locator('[data-qa="city"]').fill('TestCity');
    await page.locator('[data-qa="zipcode"]').fill('465465');
    await page.locator('[data-qa="mobile_number"]').fill('0745639689');

    // verify that account is created
    await page.getByRole('button', { name: /create account/i }).click();
    await expect(page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();

    // go to the next step - e link nu button
    await page.getByRole('link', { name: 'Continue' }).click();

    // verify that user is logged in
    await expect(page.getByRole('link', { name: /Logout/i })).toBeVisible();

});

