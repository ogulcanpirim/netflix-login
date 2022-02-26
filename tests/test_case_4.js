const { expect } = require("chai");
require("chromedriver");
const { Builder, By, until} = require("selenium-webdriver");

const BASE_URL = "http://localhost:3000/signin";

describe("TEST SUITE 4", () => {
    let driver;
    before(async () => {
        driver = await new Builder().forBrowser("chrome").build();
       // await driver.get(BASE_URL);

    });

    after(() => {
        // driver.quit();
    });

    beforeEach(async () => {
        await driver.get(BASE_URL);

    });

    afterEach(() => {
        // do something after test case execution is finished
        // no matter if there are failed cases
    });
    /*
    it("Check if wrong password works",  async() => {
        // TODO:

        await driver.wait(until.elementLocated(By.id('password')));
        await wrongLogin(driver);
        await driver.wait(until.elementLocated(By.id('message-container')));
        let errorMessage = await driver.findElement(By.id('message-container')).getText();
        expect(errorMessage).to.equal("Parola yanlış. Lütfen yeniden deneyin ya da parolanızı sıfırlayın");
    });


     */

    it("Check if invalid email form is entered",  async() => {
        // TODO: invalid format does not make sense

        await driver.wait(until.elementLocated(By.id('email-phone')));
        await driver.findElement(By.id("email-phone")).sendKeys("in");
        await driver.findElement(By.id("password")).sendKeys("pass");
        await driver.findElement(By.id("login-button")).click();
        await driver.wait(until.elementLocated(By.id('email-error-message')));
        let errorMessage = await driver.findElement(By.id("email-error-message")).getText();
        expect(errorMessage).to.equal("Lütfen geçerli bir telefon numarası veya e-posta adresi girin.");
    });
    it("Check if a too short password is entered",  async() => {
        await driver.wait(until.elementLocated(By.id('password')));
        await driver.findElement(By.id("password")).sendKeys("pas");
        await driver.findElement(By.id("login-button")).click();
        let errorMessage = await driver.findElement(By.id("wrongPassMsgContainer")).getText();
        expect(errorMessage).to.equal("Parola 4 ile 60 karakter olmalıdır.");
    });

});
const wrongLogin = async (driver) => {
    await driver.findElement(By.id("email-phone")).sendKeys("adbul@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("wrongPass");
    await driver.findElement(By.id("login-button")).click();
};


