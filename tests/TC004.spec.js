import { test, expect, chromium } from '@playwright/test';
import { HomePage } from './Pages/HomePage';
import { SignupLoginPage } from './Pages/SignupLoginPage';
import { CartPage } from './Pages/CartPage';

let browser;
let context;
let page;


test.beforeAll('Open Setup and navigated to URL', async () => {

    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
    });

    await page.goto('http://automationexercise.com');
    await page.waitForLoadState();
});

test.afterAll(async () => {
    await page.close();
});

test('Verify Place Order functionality', async () => {

    const homepage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const cart = new CartPage(page);

    //Navigated to Signup / Login page vai nav link
    await homepage.navigatedToSignupLogin();

    // login
    await signupLoginPage.userLogin('st.qa08@gmail.com', 'Test@123');

    // Navigated from Cart Page
    await homepage.navigatedToCartPage();

    // Proceed to checkout
    await cart.proceedToCheckout();
    await cart.payment('test', '4242424242424242', '456', '11', '2030');

    const orderPlaceMessage = await cart.getOrderPlaceSuccessMessage();
    console.log('Order success Message: ', orderPlaceMessage);
    await expect(orderPlaceMessage.includes('Congratulations! Your order has been confirmed!')).toBeTruthy();

    //download invoice
    await cart.downloadInvoice();

    //continue
    await cart.continue();

});