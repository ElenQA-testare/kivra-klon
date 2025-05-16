import { test, expect } from '@playwright/test';
import path from 'path';

//
// TC-01: Registrering av ny användare
//
test('TC-01: Registrering av ny användare', async ({ page }) => {
  const timestamp = Date.now();
  const email = `ellen${timestamp}@example.com`;
  const password = 'test123';

  await page.goto('http://localhost:3000/register');
  await page.fill('input[placeholder="Namn"]', `Ellen ${timestamp}`);
  await page.fill('input[placeholder="E-post"]', email);
  await page.fill('input[placeholder="Lösenord"]', password);
  await page.click('button:has-text("Registrera")');

  await expect(page.locator('text=✅ Konto skapat!')).toBeVisible({ timeout: 10000 });
  await expect(page).toHaveURL(/\/login/);
});

//
// TC-02: Registrering med existerande e-post
//
test('TC-02: Registrering med existerande e-post visar fel', async ({ page }) => {
  const email = 'ellen@example.com'; // e-post som redan finns
  const password = 'test123';

  await page.goto('http://localhost:3000/register');
  await page.fill('input[placeholder="Namn"]', 'Ellen');
  await page.fill('input[placeholder="E-post"]', email);
  await page.fill('input[placeholder="Lösenord"]', password);
  await page.click('button:has-text("Registrera")');

  await expect(page.locator('text=❌ Fel')).toBeVisible();
});

//
// TC-03: Inloggning med korrekt info
//
test('TC-03: Inloggning med korrekt info', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="E-post"]', 'ellen@example.com');
  await page.fill('input[placeholder="Lösenord"]', 'test123');
  await page.click('button:has-text("Logga in")');

  await expect(page).toHaveURL(/\/dashboard/);
});

//
// TC-04: Inloggning med fel lösenord
//
test('TC-04: Inloggning med fel lösenord', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="E-post"]', 'ellen@example.com');
  await page.fill('input[placeholder="Lösenord"]', 'fel123');
  await page.click('button:has-text("Logga in")');

  await expect(page.locator('text=❌ Fel')).toBeVisible();
});

//
// TC-05: Ladda upp dokument och visa i Inbox
//
test('TC-05: Ladda upp dokument och visa i Inbox', async ({ page }) => {
  const filePath = path.resolve(__dirname, 'testfiles/sample.pdf');

  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="E-post"]', 'ellen@example.com');
  await page.fill('input[placeholder="Lösenord"]', 'test123');
  await page.click('button:has-text("Logga in")');
  await expect(page).toHaveURL(/\/dashboard/);

  await page.goto('http://localhost:3000/dashboard/uploads');
  const fileInput = page.locator('[data-testid="file-input"]');
  await fileInput.setInputFiles(filePath);
  await page.click('button:has-text("Ladda upp")');

  await page.goto('http://localhost:3000/dashboard/inbox');
  await expect(page.locator('text=sample.pdf')).toBeVisible({ timeout: 10000 });
});

//
// TC-06: Visa felmeddelande vid felaktig inloggning
//
test('TC-06: Visa felmeddelande vid felaktig inloggning', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="E-post"]', 'fel@exempel.com');
  await page.fill('input[placeholder="Lösenord"]', 'fel123');
  await page.click('button:has-text("Logga in")');

  await expect(page.locator('text=❌ Fel')).toBeVisible();
});
