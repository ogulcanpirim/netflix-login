const { By, Builder } = require("selenium-webdriver");
require("chromedriver");

// Example of a test case
const example = async () => {
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://stars.bilkent.edu.tr");
    await driver.findElement(By.css('[title="/srs/"]')).click();
    const title = await driver.getTitle();

    console.log("Title is: ", title);
    await driver.sleep(2000);
  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }
};

example();
