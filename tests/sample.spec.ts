import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('bharath');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('chandanala');
  await page.getByTestId('text-input').press('Enter');
  await page.getByRole('listitem').filter({ hasText: 'bharath' }).getByTestId('todo-item-toggle').check();
  await page.getByRole('listitem').filter({ hasText: 'chandanala' }).getByTestId('todo-item-toggle').check();
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByRole('link', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'All' }).click();
  await page.getByText('bharath').dblclick();
  await page.getByTestId('todo-list').getByTestId('text-input').fill('sharath');
  await page.getByTestId('todo-list').getByTestId('text-input').press('Enter');
  await page.getByRole('listitem').filter({ hasText: 'sharath' }).getByTestId('todo-item-toggle').uncheck();
});