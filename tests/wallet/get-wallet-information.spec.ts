import { test, expect } from "@playwright/test";
import { fetch_wallet_response } from "@/tests/stubs/walletMock";

test.describe("Home page", () => {
  test("should mock fetching user wallet details when mounted", async ({
    page,
  }) => {
    await page.route("**/wallet*", (route) => {
      const request = route.request();
      if (request.method() === "GET") {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(fetch_wallet_response),
        });
      }
    });
    await page.goto("http://localhost:3000");
  });
});
