import { test, expect } from "@playwright/test";
import { fetch_transactions_response } from "@/tests/stubs/transactionsMock";

test.describe("Home page", () => {
  test("should mock fetching user transactions when mounted", async ({
    page,
  }) => {
    await page.route("**/transactions*", (route) => {
      const request = route.request();
      if (request.method() === "GET") {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(fetch_transactions_response),
        });
      }
    });
    await page.goto("http://localhost:3000");
  });
});
