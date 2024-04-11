import { test, expect } from "@playwright/test";
import { user_fetch_response } from "@/tests/stubs/userMock";

test.describe("Home page user profile", () => {
  test("should mock fetching user profile details when mounted", async ({
    page,
  }) => {
    await page.route("**/user*", (route) => {
      const request = route.request();
      if (request.method() === "GET") {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(user_fetch_response),
        });
      }
    });
    await page.goto("http://localhost:3000");
  });
});
