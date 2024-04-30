import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home.page";

test.describe("home page e2e test", () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);

    await homePage.open();
    await expect(page).toHaveURL("/");
  });

  test("user should be able to see correct home page title", async ({
    page,
  }) => {
    await expect(page).toHaveTitle(/#PamerAjaDulu/);
  });
});
