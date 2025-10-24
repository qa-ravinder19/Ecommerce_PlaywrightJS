exports.HomePage =

class HomePage {
  
    constructor(page)
    {
        this.page = page;
        this.signupLoginButton = "//a[text()=' Signup / Login']";
        this.loggedUser = "//div[@class='shop-menu pull-right']/ul/li[10]/a";
        this.deleteUser = "//div[@class='shop-menu pull-right']/ul/li[5]/a";
        this.deleteUserHeading = "//h2[@data-qa='account-deleted']/b";
        this.continueButton = "//a[text()='Continue']";
        this.productLink = "//li/a[text()=' Products']";
        this.cartLink = "//li/a[text()=' Cart']";
    }

    async navigatedToSignupLogin()
    {
        await this.page.locator(this.signupLoginButton).click();
    }

    async getLoggedUsername()
    {
        return await this.page.locator(this.loggedUser).textContent();
    }

    async deleteLoggedUser()
    {
        await this.page.locator(this.deleteUser).click();
    }

    async deleteSuccessMessage()
    {
        return await this.page.locator(this.deleteUserHeading).textContent();
    }

    async continue()
    {
        await this.page.locator(this.continueButton).click();
    }

    async navigatedToProductPage()
    {
        await this.page.click(this.productLink);
    }

    async navigatedToCartPage()
    {
        await this.page.click(this.cartLink);
    }
};