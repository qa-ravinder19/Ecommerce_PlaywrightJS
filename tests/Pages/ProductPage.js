exports.ProductPage =

class ProductPage {

    constructor(page)
    {
        this.page = page;
        this.allProductHeading = "//h2[text()='All Products']";
        this.allProductsCount = ".product-image-wrapper";
        this.productName = "//div[@class='product-information']/h2";
        this.productCategory = "//div[@class='product-information']/p[1]";
        this.productPrice = "//div[@class='product-information']/span/span";
        this.productAvailibility = "//div[@class='product-information']/p[2]";
        this.addToCartButton = "//div[@class='product-information']/span/button";
        this.modelTextAdded = "//div[@id='cartModal']/div/div/div[1]/h4";
        this.continueShoppingButton = "//button[text()='Continue Shopping']";
    }

    async getAllProdcutHeading()
    {
        return await this.page.locator(this.allProductHeading).textContent();
    }

    async getAllProductsCount()
    {
        return await this.page.locator(this.allProductsCount).count();
    }

    // function to alter xpath
    getViewProductButtonXpath(productName)
    {
        return `//p[text()='${productName}']/following::div[@class='choose'][1]`;
    }

    async viewProduct(productName) {
        const productButtonXpath = this.getViewProductButtonXpath(productName);
        await this.page.click(productButtonXpath);
    }

    async getProductName()
    {
        return await this.page.locator(this.productName).textContent();
    }

    async getProductCategory()
    {
        return await this.page.locator(this.productCategory).textContent();
    }

    async getProductPrice()
    {
        return await this.page.locator(this.productPrice).textContent();
    }

    async getProductAvailibilty()
    {
        return await this.page.locator(this.productAvailibility).textContent();
    }

    async productAddToCart()
    {
        await this.page.click(this.addToCartButton);
    }

    async getModelTextAdded()
    {
        return await this.page.locator(this.modelTextAdded).textContent();
    }

    async continueShopping()
    {
        await this.page.click(this.continueShoppingButton);
    }
};