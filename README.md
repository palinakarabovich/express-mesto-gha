[![Tests for sprint 13](https://github.com/palinakarabovich/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/palinakarabovich/express-mesto-gha/actions/workflows/tests-13-sprint.yml)  [![Tests for sprint 14](https://github.com/palinakarabovich/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/palinakarabovich/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

# Проект Mesto фронтенд + бэкенд

## Описание проекта
Сервер для проекта Mesto

## Основной функционал
* постановка и снятие лайка,
* удаление и создание карточки,
* обновление персональных данных пользователя и аватара,
* получение всех пользователей из базы,
* получение всех карточек из базы,
* получение пользователя по id,

## Инструменты и технологии
* Node.js,
* mongoDB,
* express.js,
* mongoose,

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
