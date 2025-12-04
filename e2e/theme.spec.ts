import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Theme Persistence", () => {
  test("persists theme across reloads", async ({ page }) => {
    await page.goto("/");

    const toggleButton = page.getByRole("button", { name: /toggle theme/i });
    const html = page.locator("html");

    // Wait for hydration/initial render
    await expect(toggleButton).toBeVisible();

    // Check initial state
    const isDarkInitially = await html.evaluate((el) => el.classList.contains("dark"));

    // 1. Toggle
    await toggleButton.click();

    // Wait for state change
    if (isDarkInitially) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }

    // 2. Reload and verify persistence
    await page.reload();
    if (isDarkInitially) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }

    // 3. Toggle back
    await toggleButton.click();

    // Wait for state change back
    if (isDarkInitially) {
      await expect(html).toHaveClass(/dark/);
    } else {
      await expect(html).not.toHaveClass(/dark/);
    }

    // 4. Reload and verify persistence
    await page.reload();
    if (isDarkInitially) {
      await expect(html).toHaveClass(/dark/);
    } else {
      await expect(html).not.toHaveClass(/dark/);
    }
  });
});
