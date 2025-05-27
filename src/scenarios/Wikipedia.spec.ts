import { test, expect } from '@playwright/test';

test('Wikipedia: Busca por "Café" e valida conteúdo', async ({ page }) => {
  await page.goto('https://www.wikipedia.org');

  await page.selectOption('select#searchLanguage', 'pt');

  const termo = 'Café';
  await page.fill('input[name="search"]', termo);
  await page.press('input[name="search"]', 'Enter');

  await expect(page).toHaveTitle(/café/i);

  const content = page.locator('#mw-content-text');
  await expect(content).toBeVisible();

  const texto = await content.textContent();
  expect(texto?.toLowerCase()).toContain('café');
});

test('Wikipedia: Busca por "Brasil" e valida conteúdo', async ({ page }) => {
  await test.step('Acessar Wikipedia em português', async () => {
    await page.goto('https://www.wikipedia.org');
    await page.selectOption('select#searchLanguage', 'pt');
  });

  await test.step('Buscar "Brasil"', async () => {
    await page.fill('input[name="search"]', 'Brasil');
    await page.press('input[name="search"]', 'Enter');
  });

  await test.step('Validar presença de conteúdo sobre Brasil', async () => {
    const content = page.locator('#mw-content-text');
    await expect(content).toBeVisible();

    const texto = await content.textContent();
    expect(texto?.toLowerCase()).toContain('brasil');
  });
});
