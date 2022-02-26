const { expect } = require("chai");
require("chromedriver");
const { Builder, By, until } = require("selenium-webdriver");

const BASE_URL = "http://localhost:3000";

describe("TEST SUITE 2 (Remember Me Test)", () => {
  let driver;

  beforeEach(async () => {
    driver = await buildDriver();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("Verifies if the 'Remember Me' functionality keeps the user credentials after logout.", async () => {
    // Login with remember me enabled
    await loginWithRememberMe(driver);
    await driver.wait(until.elementLocated(By.id("logout_button")));

    // Get local storage object
    const localStorage = await driver.executeScript(`return localStorage`);

    // Logout and check remembered values
    await logout(driver);
    await driver.get(BASE_URL);
    await driver.wait(until.elementLocated(By.id("email-phone")));

    const usernameValue = await driver.findElement(By.id("email-phone")).getAttribute("value");
    const passwordValue = await driver.findElement(By.id("password")).getAttribute("value");

    expect(usernameValue).to.equal(localStorage["Username"]) && expect(passwordValue).to.equal(localStorage["Password"]);
  });
});

// ========================= UTIL Funcs =====================
const buildDriver = async () => (driver = await new Builder().forBrowser("chrome").build());

const loginWithRememberMe = async (driver) => {
  await driver.get(BASE_URL);
  await driver.wait(until.elementLocated(By.id("email-phone")));
  await driver.findElement(By.id("rememberMe")).click();
  await driver.findElement(By.id("email-phone")).sendKeys("elham@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("elham123");
  await driver.findElement(By.id("login-button")).click();
  // Wait to fully log in
  await driver.wait(until.elementLocated(By.id("logout_button")));
};

const logout = async (driver) => {
  await driver.findElement(By.id("logout_button")).click();
};
