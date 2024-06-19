# Проект Кинопоиск

## Описание

Проект позволяет просматривать информацию о фильмах с использованием [API Кинопоиска](https://kinopoisk.dev). 
На главной странице выводятся по 50 фильмов на странице. Реализована фильтрация по году фильма, по рейтингу, по жанрам.
При клике на карточку фильма есть возможность перейти на страницу данного фильма с более подробной информацией.
Реализована возможность добавления фильмов в "Избранное".

## Установка

1. **Клонируйте репозиторий:**

    ```
    git clone https://github.com/sonkashash/kinopoisk
    cd kinopoisk
    ```

2. **Установите зависимости:**

    ```
    npm install
    ```

3. **Создайте файл окружения:**

    Скопируйте `.env.default` в `.env`:
    Ключ для использования АПИ Кинопоиска можно получить бесплатно через [сайт](https://kinopoisk.dev)

    ```
    cp .env.default .env
    ```

    Отредактируйте файл `.env` с вашими настройками.

4. **Запустите проект локально:**

    ```
    npm start
    ```

## Использование

Проект будет доступен по адресу `http://localhost:3000`

## СТЭК

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)


## Требования

- Node.js
- npm

