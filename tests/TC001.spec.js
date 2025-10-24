import { test, expect, chromium } from '@playwright/test';
import { HomePage } from './Pages/HomePage';
import { SignupLoginPage } from './Pages/SignupLoginPage';
import { CommonMethods } from './Pages/CommonMethods/CommonMethods';

let browser;
let context;
let page;

const newUserEmail = 'test_email_'+CommonMethods.getLocalTime()+'@gmail.com';

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


test('Register new user and Delete', async () => {

    const homepage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);

    //Navigated to Signup / Login page with nav link
    await homepage.navigatedToSignupLogin();

    const heading = await signupLoginPage.getNewUserSignupHeading();
    console.log("Heading for Signup Section: ", heading);
    await expect(heading.includes('New User Signup!')).toBeTruthy();

    //Creaet new user
    console.log('New User email: '+newUserEmail);
    await signupLoginPage.createNewUser('test', newUserEmail);
    await signupLoginPage.createAccountForm('Test@123', '18', 'January', '1998', 'test', 'test', 'test ,test address', 'test', 'test city', '155441', '9876543210');
    await signupLoginPage.clickOnCreateAccountButton();

    // Validate new user - aknowledged message
    const successMessage = await signupLoginPage.accountCreateSuccessMessage();
    console.log('success message while account create: ', successMessage);
    await expect(successMessage.includes('Account Created!')).toBeTruthy();

    await signupLoginPage.continue();

    // Validate new user - Logged user's username
    const loggedUsername = await homepage.getLoggedUsername();
    console.log('Logged username: ', loggedUsername);
    await expect(loggedUsername.includes('Logged in as test')).toBeTruthy();

    // Delete created user
    await homepage.deleteLoggedUser();

    // Validate Delete user - aknowledged message
    const deleteSuccsess = await homepage.deleteSuccessMessage();
    console.log('success message while delete logged account: ', deleteSuccsess);
    await expect(deleteSuccsess.includes('Account Deleted!')).toBeTruthy();

});