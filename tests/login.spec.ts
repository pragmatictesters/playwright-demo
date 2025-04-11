import { test, expect } from "@playwright/test";
import { beforeEach } from "node:test";
import { LoginPage } from "../pages/login-page";
import { InventoryPage } from "../pages/inventory-page";

test.beforeEach("Access login page", async ({ page }) => {
  console.log(`Test ${test.info().title}`);
  await page.goto("/");
});

test.afterEach("Close browser", async ({ browser }) => {
  console.log(`Completed ${test.info().title}`);
});

test(
  "test with valid user credentials",
  { tag: "@smoke" },
  async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.getByTestId("username")).toBeVisible();
    await expect(page.getByTestId("password")).toBeVisible();
    await expect(page.getByTestId("login-button")).toBeVisible();
    await expect(page.getByTestId("login-button")).toHaveText("Login");
    await expect(page.getByTestId("login-button")).toBeEnabled();
    await expect(page.getByTestId("login-button")).toHaveAttribute(
      "type",
      "submit"
    );
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="username"]').press("Tab");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText("Products");
    await expect(
      page.locator(
        '[data-test="item-4-title-link"] [data-test="inventory-item-name"]'
      )
    ).toContainText("Sauce Labs Backpack");
  }
);

test.skip("Visual test - login page", async ({ page }) => {
    //await expect(page).toHaveScreenshot("login-page.png");
});

test("test with valid user credentials using page object", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  const inventoryPage = new InventoryPage(page);
  expect(await inventoryPage.getPageHeader()).toContain("Productss");
});


test(
  "test with valid user credentials using testIdAttribute",
  { tag: "@smoke" },
  async ({ page }) => {
    await page.getByTestId("username").fill("standard_user");
    await page.getByTestId("username").press("Tab");
    await page.getByTestId("password").fill("secret_sauce");
    await page.getByTestId("login-button").click();
    await expect(page.getByTestId("title")).toContainText("Products");
    await expect(
      page.locator(
        '[data-test="item-4-title-link"] [data-test="inventory-item-name"]'
      )
    ).toContainText("Sauce Labs Backpack");
  }
);

test(
  "test with valid user credentials using placeholder",
  { tag: "@smoke" },
  async ({ page }) => {
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Username").press("Tab");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByTestId("login-button").click();
    //Verify landing page screenshot 
   // await expect(page).toHaveScreenshot("landing-page.png");

    await expect(page.getByTestId("title")).toContainText("Products");
    await expect(
      page.locator(
        '[data-test="item-4-title-link"] [data-test="inventory-item-name"]'
      )
    ).toContainText("Sauce Labs Backpack");
  }
);

test.describe("Login regression tests", { tag: "@regression" }, () => {
  test("test login with invalid password", async ({ page }) => {
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="username"]').press("Tab");
    await page.locator('[data-test="password"]').fill("test");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("test login with blank username and blank password", async ({
    page,
  }) => {
    await page.locator('[data-test="username"]').clear();
    await page.locator('[data-test="username"]').press("Tab");
    await page.locator('[data-test="password"]').clear;
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: Username is required");
    //Verify screenshot of the error message for blank username and password
    //await expect(page).toHaveScreenshot("error-blank-username-password.png" , {
     // maxDiffPixels: 200});

  });

  test("test login with blank username and a password", async ({ page }) => {
    await page.locator('[data-test="username"]').clear();
    await page.locator('[data-test="username"]').press("Tab");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Username is required"
    );
    //Verify screenshot of the error message for blank username and password
    //await expect(page).toHaveScreenshot("error-blank-username-password.png");
  });

  test(
    "test login with a username and blank password",
    {
      annotation: {
        type: "test",
        description: "test login with a username and blank password",
      },
    },
    async ({ page }) => {
      await page.locator('[data-test="username"]').fill("standard_user");
      await page.locator('[data-test="username"]').press("Tab");
      await page.locator('[data-test="password"]').clear();
      await page.locator('[data-test="login-button"]').click();
      await expect(page.locator('[data-test="error"]')).toContainText(
        "Epic sadface: Password is required"
      );
      //Verify screenshot of the error message for  username and  a blank password
      //await expect(page).toHaveScreenshot("error-blank-password.png");
    }
  );

  test("test login with locked out user", async ({ page }) => {
    await page.locator('[data-test="username"]').fill("locked_out_user");
    await page.locator('[data-test="username"]').press("Tab");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Sorry, this user has been locked out."
    );
    //Verify screenshot of the error message for locked out user
   // await expect(page).toHaveScreenshot("error-locked-out-user.png");
  });

  test("test login with a problem user", async ({ page }) => {
    await page.locator('[data-test="username"]').fill("problem_user");
    await page.locator('[data-test="username"]').press("Tab");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText("Products");
    await expect(
      page.locator(
        '[data-test="item-4-title-link"] [data-test="inventory-item-name"]'
      )
    ).toContainText("Sauce Labs Backpack");
  });

  test("test login with a performance glitch user", async ({ page }) => {
    await page
      .locator('[data-test="username"]')
      .fill("performance_glitch_user");
    await page.locator('[data-test="username"]').press("Tab");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText("Products");
    await expect(
      page.locator(
        '[data-test="item-4-title-link"] [data-test="inventory-item-name"]'
      )
    ).toContainText("Sauce Labs Backpack");
  });
});
