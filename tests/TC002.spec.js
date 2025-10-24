import { test, expect, chromium } from '@playwright/test';
import { HomePage } from './Pages/HomePage';
import { SignupLoginPage } from './Pages/SignupLoginPage';

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


test('Register User with existing email', async () => {

    const homepage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);

    //Navigated to Signup / Login page vai nav link
    await homepage.navigatedToSignupLogin();

    const heading = await signupLoginPage.getNewUserSignupHeading();
    console.log("Heading for Signup Section: ", heading);
    await expect(heading.includes('New User Signup!')).toBeTruthy();

    //Creaet user with an existing email id
    console.log('User email: st.qa08@gmail.com');
    await signupLoginPage.createNewUser('test', 'st.qa08@gmail.com');  

    // validate with error message
    const errorMessage = await signupLoginPage.getErrorMessage();
    console.log("Error Message : ", errorMessage);
    await expect(errorMessage.includes('Email Address already exist!')).toBeTruthy();
});

test('Login with valid credentials', async () => {

    const homepage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);

    // login
    await signupLoginPage.userLogin('st.qa08@gmail.com', 'Test@123');

    // validate login - Logged user's username
    const loggedUsername = await homepage.getLoggedUsername();
    console.log('Logged username: ', loggedUsername);
    await expect(loggedUsername.includes('Logged in as test')).toBeTruthy();

});