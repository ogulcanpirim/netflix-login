const { expect } = require("chai");
require("chromedriver");
const { Builder, By, until} = require("selenium-webdriver");

const BASE_URL = "http://localhost:3000/signin";

describe("TEST SUITE 4", () => {
    let driver;
    before(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get(BASE_URL);

    });

    after(() => {
        // driver.quit();
    });

    beforeEach(async () => {



    });

    afterEach(() => {
        // do something after test case execution is finished
        // no matter if there are failed cases
    });

    it("Verifies the login page by pressing 'Back button' of the browser." +
        " It should not allow the user to enter into the system once they log out.",  async() => {
        // TODO:
        await driver.wait(until.elementLocated(By.id('password')));

       // await driver.findElement(By.id("password")).clear();
      //  await driver.findElement(By.id("password")).click();
        await driver.findElement(By.id("email_phone")).sendKeys("elham@gmail.com");
        await driver.findElement(By.id("password")).sendKeys("elham123");
        await driver.findElement(By.xpath("//button[contains(text(),'Oturum Aç')]")).click();
        await driver.wait(until.elementLocated(By.id('logout_button')));

        const title =  await driver.getTitle();
        expect(title).to.equal("Netflix Home");
    });


});


