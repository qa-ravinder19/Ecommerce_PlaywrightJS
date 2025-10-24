import { test, expect, chromium } from '@playwright/test';
import { HomePage } from './Pages/HomePage';
import { SignupLoginPage } from './Pages/SignupLoginPage';
import { ProductPage } from './Pages/ProductPage';
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

test('Verify All Products and product detail page', async () => {

    const homepage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    //Navigated to Signup / Login page vai nav link
    await homepage.navigatedToSignupLogin();

    // login
    await signupLoginPage.userLogin('st.qa08@gmail.com', 'Test@123');

    // navigated to product page
    await homepage.navigatedToProductPage();

    // validate with section heading
    const allProductHeading = await product.getAllProdcutHeading();
    console.log('Section Heading: ', allProductHeading);
    await expect(allProductHeading.includes('All Products')).toBeTruthy();

    // validate with all product counts
    const productCount = await product.getAllProductsCount();
    console.log('All available products: ', productCount);
    await expect(productCount).toBe(34);

    //View product
    await product.viewProduct('Men Tshirt');

    // validate product name
    const productName = await product.getProductName();
    console.log('Product Name: ', productName);
    await expect(productName.includes('Men Tshirt')).toBeTruthy();

    // validate product category
    const productCategory = await product.getProductCategory();
    console.log('Product Category: ', productCategory);
    await expect(productCategory.includes('Category: Men > Tshirts')).toBeTruthy();

    // validate product price
    const productPrice = await product.getProductPrice();
    console.log('Product Price: ', productPrice);
    await expect(productPrice.includes('Rs. 400')).toBeTruthy();

    // validate product availibily
    const productAvailibility = await product.getProductAvailibilty();
    console.log('Product Availibility: ', productAvailibility);
    await expect(productAvailibility.includes(' In Stock')).toBeTruthy();

    // Add to product Page
    await product.productAddToCart();

    // validate product status while adding in cart
    const addtoCartModelText = await product.getModelTextAdded();
    console.log('Product Status while adding in cart: ', addtoCartModelText);
    await expect(addtoCartModelText.includes('Added!')).toBeTruthy();

    // continue shopping 
    await product.continueShopping();

    //Validate from Cart Page
    await homepage.navigatedToCartPage();

    const productNameCart = await cart.getProductName();
    console.log('Product Name from Cart Page: ', productNameCart);
    await expect(productNameCart.includes(productName)).toBeTruthy();

    await page.waitForTimeout(5000);
});