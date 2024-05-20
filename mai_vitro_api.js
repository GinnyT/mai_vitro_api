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
                "UserName": init_data.username,
                "Password": init_data.password,
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

    
    
};