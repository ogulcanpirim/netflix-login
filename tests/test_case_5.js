
const { expect } = require("chai");
require("chromedriver");
const { Builder, By, until } = require("selenium-webdriver");

const BASE_URL = "http://localhost:3000";

describe("TEST SUITE 5 (Different Browsers Test)", () => {
  let driver;
  let firefoxDriver;

  beforeEach(async () => {
    driver = await buildDriver('chrome');
    firefoxDriver = await buildDriver('firefox');
  });

  afterEach(async () => {
    await driver.quit();
    await firefoxDriver.quit();
  });

  it("Verifies if a user should be able to login with the same credentials in different browsers at the same time.", async () => {
    // Login with chrome
    await login(driver);
    // Login with firefox    
    await login(firefoxDriver);
    // Check titles
    const chromeTitle = await driver.getTitle();
    const firefoxTitle = await firefoxDriver.getTitle();    
    expect(chromeTitle).to.equal(firefoxTitle).to.equal("Netflix Home");
  });
});

// ========================= UTIL Funcs =====================
const buildDriver = async (name) => (driver = await new Builder().forBrowser(name).build());

const login = async (driver) => {
  await driver.get(BASE_URL);
  await driver.wait(until.elementLocated(By.id("email-phone")));
  await driver.findElement(By.id("email-phone")).sendKeys("elham@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("elham123");
  await driver.findElement(By.id("login-button")).click();
  // Wait to fully log in
  await driver.wait(until.elementLocated(By.id("logout_button")));
};
