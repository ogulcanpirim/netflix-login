

const { expect } = require("chai");
require("chromedriver");
const { Builder, By, until } = require("selenium-webdriver");

const BASE_URL = "http://localhost:3000/signin";

describe("TEST SUITE 4 (Error Messages Tests)", () => {
  let driver;
  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(() => {
    driver.quit();
  });

  beforeEach(async () => {
    await driver.get(BASE_URL);
  });

  it("Check if invalid email form is entered.", async () => {
    await driver.wait(until.elementLocated(By.id("email-phone")));
    await driver.findElement(By.id("email-phone")).sendKeys("in");
    await driver.findElement(By.id("password")).sendKeys("pass");
    await driver.findElement(By.id("login-button")).click();
    await driver.wait(until.elementLocated(By.id("email-error-message")));
    let errorMessage = await driver.findElement(By.id("email-error-message")).getText();
    expect(errorMessage).to.equal("Lütfen geçerli bir telefon numarası veya e-posta adresi girin.");
  });

  it("Check if a too short password is entered", async () => {
    await driver.wait(until.elementLocated(By.id("password")));
    await driver.findElement(By.id("password")).sendKeys("pas");
    await driver.findElement(By.id("login-button")).click();
    let errorMessage = await driver.findElement(By.id("wrongPassMsgContainer")).getText();
    expect(errorMessage).to.equal("Parola 4 ile 60 karakter olmalıdır.");
  });
});
