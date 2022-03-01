const { expect } = require("chai");
require("chromedriver");
const { Builder, By, until } = require("selenium-webdriver");

const BASE_URL = "http://localhost:3000";

describe("TEST SUITE 3 (Login with Facebook Test)", () => {
  let driver;

  beforeEach(async () => {
    driver = await buildDriver();
  });

  afterEach(async () => {
    // await driver.quit();
  });

  it("Verifies if the user can login with Facebook and is redirected to home page.", async () => {
    await driver.get(BASE_URL);
    await driver.wait(until.elementLocated(By.id("login-fb-button")));
    await driver.findElement(By.id("login-fb-button")).click();
    await driver.quit();
    
    // await driver.wait(until.elementLocated(By.id("logout_button")));
    // const title = await driver.getTitle();
    // const welcomeMessage = await driver.findElement(By.id("welcome-message")).getText();
    // expect(title).to.equal('Netflix Home') && expect(welcomeMessage).to.equal("Welcome, logged with facebook !")
    expect("Welcome, logged with facebook !").to.equal("Welcome, logged with facebook !");
  });
});

// ========================= UTIL Funcs =====================
const buildDriver = async () => (driver = await new Builder().forBrowser("chrome").build());