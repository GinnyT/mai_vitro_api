//      Асинхронный класс-обертка для официального Vitro-CAD API
//      Исходник: https://api.vitrocad.ru/
//      © Милков А. И. https://github.com/GinnyT

module.exports = class MAI_Vitro_API {
    
    //Консруктор вызывается в статическом методе init() 
    constructor({ baseUrl, username, password }, init_response) {
        this.baseUrl = baseUrl;
        this.username = username;
        //this.password = password;
        //this.init_response = init_response;
        this.token = init_response.token;
        this.expires = new Date(init_response.expires);
    };

    //коннектимся
    static async init(init_data = { baseUrl, username, password }) {
        const response = await fetch(`${init_data.baseUrl}/api/security/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                "login": init_data.username,
                "password": init_data.password,
            })
        })
        .catch(err => {
            throw new Error(`Ошибка подключения!\n ${err}\n-----`);
        });

        const json = await response.json()
        .catch(err=> {
            throw new Error(`Ошибка ответа сервера! \n ${err}\n-----`);
        });

        if (!json.token) {
            throw new Error(`Ошибка авторизации! \n-----`);
        }

        return new MAI_Vitro_API(init_data, json);
    };

    //проверяем, не протух ли токен
    get is_alive() {
        return this.expires > Date.now();
    };

    //**Все элементы

    //Чтение метаданных. 
    /* URL: api/item/get/{itemId}
    Метод: POST
    Описание: получить информацию об элементе по ID элемента
    Входные параметры:
    itemId: Guid - ID элемента списка
    Выходные параметры:
    json объект:

    {
        id: Guid -  ID элемента
        siteId: Guid -  ID сайта
        listId: Guid -  ID списка
        parentId: Guid -  ID родительского элемента
        itemPath: ItemPath -  путь до элемента + количество дочерних элементов
        сontentTypeId - ID типа контента элемента
        fieldValueMap - объект ключ-значение. Ключ - internalName поля, значение - значение этого поля в элементе
    } */

    async item_get(itemId) {
        const response = await fetch(
            `${this.baseUrl}/api/item/get/${itemId}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization':`${this.token}`,
              },
            }
        )
        .catch(err => {
            throw new Error(`Ошибка запроса!\n ${err}\n-----`);
        });

        const json = await response.json()
        .catch(err=> {
            throw new Error(`Ошибка ответа сервера! \n ${err}\n-----`);
        });

        return json;
    };
};