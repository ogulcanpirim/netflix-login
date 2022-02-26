const { expect } = require("chai");
require("chromedriver");
const { Builder, By, until } = require("selenium-webdriver");

const BASE_URL = "http://localhost:3000";

describe("TEST SUITE 4 (Different Browsers Test)", () => {
  let driver;

  beforeEach(async () => {
    driver = await buildDriver();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("Verifies if a user should be able to login with the same credentials in different browsers at the same time.", async () => {
    // Login with chrome
    await login(driver);
    // Login with firefox
    const firefoxDriver = await new Builder().forBrowser("firefox").build();
    await login(firefoxDriver);
    // Check titles
    const chromeTitle = await driver.getTitle();
    const firefoxTitle = await firefoxDriver.getTitle();
    expect(chromeTitle).to.equal(firefoxTitle).to.equal("Netflix Home");
    firefoxDriver.quit();
  });
});

// ========================= UTIL Funcs =====================
const buildDriver = async () => (driver = await new Builder().forBrowser("chrome").build());

const login = async (driver) => {
  await driver.get(BASE_URL);
  await driver.wait(until.elementLocated(By.id("email-phone")));
  await driver.findElement(By.id("email-phone")).sendKeys("elham@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("elham123");
  await driver.findElement(By.id("login-button")).click();
  // Wait to fully log in
  await driver.wait(until.elementLocated(By.id("logout_button")));
};
