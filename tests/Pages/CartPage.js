exports.CartPage =

class CartPage {

    constructor(page)
    {
        this.page = page;
        this.productName = "//tbody/tr/td[2]/h4/a";
        this.proceedToCheckoutButton = "//a[text()='Proceed To Checkout']";
        this.placeOrderButton = "//a[text()='Place Order']";
        this.namePayment = "//input[@name='name_on_card']";
        this.cardNumberPayment = "//input[@name='card_number']";
        this.cvcPayment = "//input[@name='cvc']";
        this.expMonthPayment = "//input[@name='expiry_month']";
        this.expYearPayment = "//input[@name='expiry_year']";
        this.payConfirmOrderButton = '#submit';
        this.orderPlaceSuccessMessage = "//p[contains(text(), 'order has been confirmed')]";
        this.downloadInvoiceButton = "//a[text()='Download Invoice']";
        this.continueButton = "//a[text()='Continue']";
    }
    
    async getProductName()
    {
        return await this.page.locator(this.productName).textContent();
    }

    async proceedToCheckout()
    {
        await this.page.click(this.proceedToCheckoutButton);
        await this.page.click(this.placeOrderButton);
    }

    async payment(name, cardNumber, CVC, expMonth, expYear)
    {
        await this.page.fill(this.namePayment, name);
        await this.page.fill(this.cardNumberPayment, cardNumber);
        await this.page.fill(this.cvcPayment, CVC);
        await this.page.fill(this.expMonthPayment, expMonth);
        await this.page.fill(this.expYearPayment, expYear);
        await this.page.click(this.payConfirmOrderButton);
    }

    async getOrderPlaceSuccessMessage()
    {
        return await this.page.locator(this.orderPlaceSuccessMessage).textContent();
    }

    async downloadInvoice()
    {
        const downlaodEvent = this.page.waitForEvent('download');
        await this.page.click(this.downloadInvoiceButton);
        const download = await downlaodEvent;
        await download.saveAs('tests/Downloads/' + download.suggestedFilename());
    }

    async continue()
    {
        await this.page.click(this.continueButton);
    }
};