# О проекте
Реализация JavaScript класса-обертки для асинхронной работы с REST API Vitro-CAD предоставляет интерфейс для выполнения различных операций в системе Vitro-CAD (Vitro MP).

 *  Автор:  Милков А. И. https://github.com/GinnyT

 *  Язык разработки: JavaScript (ECMAScript 2022 (ES12))

 *  Документация вендора: https://api.vitrocad.ru

 *  VITRO MP REST API dерсия 24.1.37

 *  Лицензия: открытый исходный код, GNU GPL.

## Возможности

-  ```static async init({ baseUrl, username, password })``` - инициализация подключения к системе Vitro-CAD
-  ```get is_alive()``` - проверка текущего токена экземпляра
-  ```async item_get(itemId)``` - получить информацию об элементе системы по ID элемента

## Установка

Для использования класса-обертки необходимо выполнить следующие шаги:

1. Скопируйте файлы проекта в директорию вашего приложения.
2. Подключите файлы класса-обертки к вашему проекту.
3. Инициализируйте класс.

## Примеры:

JavaScript

```
//Подключение библиотеки
const VITRO = require('./mai_vitro_api');

//Пример реализации асинхронной функции
async function init_test(init_data) {
    //Инициализация класса
    const api = await VITRO.init(init_data);

    //проверка API токена (выдается на три дня)
    console.info('Жив? ', api.is_alive);
};

//Вызов асинхронной функции
try {
    init_test({ 
        baseUrl: 'http://vitro-cad.example',
        username:  'login',
        password:   'password'
    });
} catch (err) {
    console.error(err); // обработка ошибки
};
```

## Базовое ПО

Vitro-CAD - это готовая к применению «из коробки» среда общих данных в строительных проектах (система управления проектными данными), которая обеспечивает работу CAD и BIM комплексов, поддержку удаленной работы и распределенные структуры филиалов предприятий, обеспечивает разграничение доступа к данным, реализует оповещения по событиям и многие другие функции инженерно-технического документооборота.

Компания ООО «Витро Софт» выпустила Vitro-CAD в 2010 году. Основные внедрения системы были реализованы на базе ПО Microsoft SharePoint, при этом система имеет широко развитые инструменты интеграции со средствами разработки и анализа проектной документации (офисные приложения, САПР, BIM различных вендоров) и реализует полноценную среду общих данных и всесторонне обеспечивает проектную деятельность.

26 октября 2023 года система Vitro-CAD стала доступна на новой полностью переработанной собственной платформе **Vitro MP** (multiplatform). Система реализуется в двух вариантах: на серверах заказчика (on-premise) и в виде облачного сервиса (SaaS).

Клиентская часть Vitro MP реализована в обновленном web-интерфейсе (React JS), серверные компоненты могут быть развернуты на различных операционных системах (.Net Core).

Реализована полноценная документированная поддержка REST API.