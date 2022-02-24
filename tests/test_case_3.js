const { expect } = require("chai");
require("chromedriver");
const { Builder, By, until, WindowType, wait } = require("selenium-webdriver");

const BASE_URL = "http://localhost:3000";

describe("TEST SUITE 3", () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("Verifies the login page by pressing 'Back button' of the browser. It should not allow the user to enter into the system once they log out.", async () => {
    await login(driver);
    await logout(driver);
    await driver.navigate().back();
    const title = await driver.getTitle();
    expect(title).to.equal("Netflix Login");
  });

  it("Verifies if a user should not be allowed to log in with different credentials from the same browser at the same time.", async () => {
    await login(driver);
    // Try openning login page again
    await driver.switchTo().newWindow("tab");
    await driver.get(BASE_URL);
    // There is a small delay before showing the homepage
    await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
    const title = await driver.getTitle();
    expect(title).to.equal("Netflix Home");
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

const login = async (driver) => {
  await driver.get(BASE_URL);
  await driver.wait(until.elementLocated(By.id("email_phone")));
  await driver.findElement(By.id("email_phone")).sendKeys("elham@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("elham123");
  await driver.findElement(By.id("login-submit")).click();
  // Wait to fully log in
  await driver.wait(until.elementLocated(By.id("logout")));
};

const logout = async (driver) => {
  await driver.wait(until.elementLocated(By.id("logout")));
  await driver.findElement(By.id("logout")).click();
};
