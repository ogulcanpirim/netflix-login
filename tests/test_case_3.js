const { expect } = require("chai");
require("chromedriver");
const { Builder, By, until, WindowType, wait } = require("selenium-webdriver");

const BASE_URL = "http://localhost:3000";

describe("TEST SUITE 3", () => {
  let driver;

  beforeEach(async () => {
    driver = await buildDriver();
  });

  afterEach(async () => {
    await driver.quit();
  });

  // it("Verifies the login page by pressing 'Back button' of the browser. It should not allow the user to enter into the system once they log out.", async () => {
  //   await login(driver);
  //   await logout(driver);
  //   await driver.navigate().back();
  //   const title = await driver.getTitle();
  //   expect(title).to.equal("Netflix Login");
  // });

  it("Verifies if the 'Remember Me' functionality keeps the user credentials after logout.", async () => {
    // Login with remember me enabled
    await driver.get(BASE_URL);
    await loginWithRememberMe(driver);
    await driver.wait(until.elementLocated(By.id("logout")));

    // Get local storage object
    const oldStorage = await driver.executeScript(`return localStorage`);

    // Quit current driver and create new one
    await driver.quit();
    driver = await buildDriver();

    // Set the local storage of the new driver to include
    // the username and password
    await driver.get(BASE_URL);
    await driver.executeScript("localStorage.setItem(arguments[0], arguments[1])", "Username", oldStorage["Username"]);
    await driver.executeScript("localStorage.setItem(arguments[0], arguments[1])", "Password", oldStorage["Password"]);

    await driver.wait(until.elementLocated(By.id("email_phone")));

    const usernameValue = await driver.findElement(By.id("email_phone")).getAttribute("value");
    const passwordValue = await driver.findElement(By.id("password")).getAttribute("value");

    expect(usernameValue).to.equal(oldStorage["Username"]) && expect(passwordValue).to.equal(oldStorage["Password"]);
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
  await driver.wait(until.elementLocated(By.id("email_phone")));
  await driver.findElement(By.id("email_phone")).sendKeys("elham@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("elham123");
  await driver.findElement(By.id("login-submit")).click();
  // Wait to fully log in
  await driver.wait(until.elementLocated(By.id("logout")));
};

const loginWithRememberMe = async (driver) => {
  await driver.wait(until.elementLocated(By.id("email_phone")));
  await driver.findElement(By.id("rememberMe")).click();
  await driver.findElement(By.id("email_phone")).sendKeys("elham@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("elham123");
  await driver.findElement(By.id("login-submit")).click();
  // Wait to fully log in
  await driver.wait(until.elementLocated(By.id("logout")));
};

// const logout = async (driver) => {
//   await driver.wait(until.elementLocated(By.id("logout")));
//   await driver.findElement(By.id("logout")).click();
// };
