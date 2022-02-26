const { expect } = require("chai");
require("chromedriver");
const { Builder, By, until } = require("selenium-webdriver");

const BASE_URL = "http://localhost:3000/signin";

describe("TEST SUITE 1 (Credential Tests)", () => {
  let driver;

  beforeEach(async () => {
    driver = await buildDriver();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("Verifies if the user can login with registered email and password.", async () => {
    await driver.get(BASE_URL);
    await driver.wait(until.elementLocated(By.id("email-phone")));
    await driver.findElement(By.id("email-phone")).sendKeys("elham@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("elham123");
    await driver.findElement(By.id("login-button")).click();

    await driver.wait(until.elementLocated(By.id("logout_button")));
    const title = await driver.getTitle();
    expect(title).to.equal("Netflix Home");
  });

  it("Verifies if user cannot login with unregistered email and password.", async () => {
    await driver.get(BASE_URL);
    await driver.wait(until.elementLocated(By.id("email-phone")));
    await driver.findElement(By.id("email-phone")).sendKeys("elham@hotmail.com");
    await driver.findElement(By.id("password")).sendKeys("password123");
    await driver.findElement(By.id("login-button")).click();

    await driver.wait(until.elementLocated(By.id("message-container")));
    let errorMessage = await driver.findElement(By.id("message-container")).getText();
    expect(errorMessage).to.equal(
      "Bu e-posta adresi ile bağlantılı bir hesap bulamadık. Lütfen yeniden deneyin ya da yeni bir hesap oluşturun."
    );
  });
});

const buildDriver = async () => {
  const driver = await new Builder().forBrowser("chrome").build();
  return driver;
};
