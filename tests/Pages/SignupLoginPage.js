exports.SignupLoginPage =

class SignupLoginPage {

    
    constructor(page)
    {
        this.page = page;

        // Login
        this.loginEmailField = "//input[@data-qa='login-email']";
        this.loginPasswordField = "//input[@data-qa='login-password']";
        this.loginButton = "//button[text()='Login']";

        //sign-up
        this.newUserSignupHeading ="//h2[text()='New User Signup!']";
        this.signupName = "//input[@data-qa='signup-name']";
        this.signupEmail = "//input[@data-qa='signup-email']";
        this.signupButton = "//button[text()='Signup']";

        //Sign-up form
        this.titleMr = "#id_gender1";
        this.passwordField = "#password";
        this.selectDay = "#days";
        this.selectMonth = "#months";
        this.selectYear = "#years";
        this.firstNameField = '#first_name';
        this.lastNameField = '#last_name';
        this.address1 = "#address1";
        this.stateField = '#state';
        this.cityField = '#city';
        this.zipcodeField = '#zipcode';
        this.mobileNoField = '#mobile_number';
        this.createAccountButton = "//button[text()='Create Account']";

        //Success message
        this.successMessage = "//h2[@data-qa='account-created']/b";

        //continue button
        this.continueButton = "//a[text()='Continue']";

        //Error - Email Address already exist!
        this.errorMessage = "//p[@style='color: red;']";
    }

    async userLogin(email, password)
    {
        await this.page.locator(this.loginEmailField).fill(email);
        await this.page.locator(this.loginPasswordField).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    async getNewUserSignupHeading()
    {
        return await this.page.locator(this.newUserSignupHeading).textContent();
    }

    async createNewUser(name, email)
    {
        await this.page.locator(this.signupName).fill(name);
        await this.page.locator(this.signupEmail).fill(email);
        await this.page.locator(this.signupButton).click();
    }

    async createAccountForm(password, day, month, year, firstName, lastName, address, state, city, zipcode, mobile)
    {
        await this.page.locator(this.titleMr).check();
        await this.page.locator(this.passwordField).fill(password);
        await this.page.locator(this.selectDay).selectOption(day);
        await this.page.locator(this.selectMonth).selectOption(month);
        await this.page.locator(this.selectYear).selectOption(year);
        await this.page.locator(this.firstNameField).fill(firstName);
        await this.page.locator(this.lastNameField).fill(lastName);
        await this.page.locator(this.address1).fill(address);
        await this.page.locator(this.stateField).fill(state);
        await this.page.locator(this.cityField).fill(city);
        await this.page.locator(this.zipcodeField).fill(zipcode);
        await this.page.locator(this.mobileNoField).fill(mobile);
    }

    async clickOnCreateAccountButton()
    {
        await this.page.locator(this.createAccountButton).click();
    }

    async accountCreateSuccessMessage()
    {
        return await this.page.locator(this.successMessage).textContent();
    }

    async continue()
    {
        await this.page.locator(this.continueButton).click();
    }

    async getErrorMessage()
    {
        return await this.page.locator(this.errorMessage).textContent();
    }
};