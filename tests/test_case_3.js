const { expect } = require("chai");
require("chromedriver");
const { Builder, By } = require("selenium-webdriver");

const BASE_URL = "http://localhost:3000";

describe("TEST SUITE 3", () => {
  let driver;
  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(() => {
    // driver.quit();
  });

  beforeEach(() => {
    // do something before test case execution
    // no matter if there are failed cases
  });

  afterEach(() => {
    // do something after test case execution is finished
    // no matter if there are failed cases
  });

  it("Verifies the login page by pressing 'Back button' of the browser. It should not allow the user to enter into the system once they log out.", async () => {
    // TODO:
    await login(driver);
    const title = await driver.getTitle();
    expect(title).to.equal("Netflix Home");
  });

  it("Verifies if a user should not be allowed to log in with different credentials from the same browser at the same time.", () => {
    // TODO:
  });

  it("Verifies if a user should be able to login with the same credentials in different browsers at the same time.", () => {
    // TODO:
  });
});

const login = async (driver) => {
  await driver.get(BASE_URL);
  await driver.findElement(By.id("email_phone")).sendKeys("elham@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("elham123");
  await driver.findElement(By.xpath("//button[contains(text(),'Oturum Aç')]")).click();
};
