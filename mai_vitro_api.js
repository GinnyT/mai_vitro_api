//      Класс-обертка для официального Vitro-CAD API
//      Исходник: https://api.vitrocad.ru/
//      © Милков А. И. https://github.com/GinnyT

module.exports = class MAI_Vitro_API {

    //коннектимся
    constructor(server, login, pass) { 
        //this.login();
    };

    //инициализируемся для асинхронных вещей 
    // static async init(chat_id) {
    //     const async_data = await readFile(Chat_data_in_files.file_path(chat_id)).catch(err=>console.error('ошибка чтения файла:\n',err.name));
    //     return new Chat_data_in_files(chat_id, async_data);
    // }

    get is_alive() {
        return this.expires < Date.now();
    };

    
};