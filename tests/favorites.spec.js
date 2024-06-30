// @ts-check
const { test, expect } = require('@playwright/test');
const { MainPage } = require('../pages/main.page');
const { FavoritesPage } = require('../pages/favorites.page');

test.beforeEach(async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();
  await mainPage.closeAlerts();
  //Log in
  await mainPage.clickAccount();
  await mainPage.login('my.miller.m@gmail.com', 'therner.2');
  await mainPage.pageLoad('load');
});

test('Add stuff to specials', async ({ page }) => {
  //переход на страницу избранных товаров
  const mainPage = new MainPage(page);
  const favoritesPage = new FavoritesPage(page);
  await mainPage.clickAccount();
  await favoritesPage.openFavorites();
  await favoritesPage.pageLoad('load');

  //очистка избранных
  await favoritesPage.cleanFavorites();

  //добавление мультиварки в избранные
  await favoritesPage.searchStuff('Мультиварка Redmond MC109');

  //нажатие на ссылку мультиварки и её добавление в избранное
  await favoritesPage.selectStuff("Мультиварка Redmond MC109");

  //переход на страницу избранных товаров
  await mainPage.clickAccount();
  await favoritesPage.openFavorites()
  await favoritesPage.pageLoad('load');
  await favoritesPage.checkAdedStuff();
});

test('Select and Remove featured products', async ({ page }) => {
  //переход на страницу избранных товаров
  const mainPage = new MainPage(page);
  const favoritesPage = new FavoritesPage(page);
  await mainPage.clickAccount();
  await favoritesPage.openFavorites();

  //очистка избранных
  await favoritesPage.cleanFavorites();
});
