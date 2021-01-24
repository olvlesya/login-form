export const axios = (success = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      success
        ? resolve({
            user: {
              email: "lesyonoknou@gmail.com",
              is_active: false,
            },
            client_id: "RU-839861",
            phone: "+48535430288",
            invited_by: "RU-637164",
            name: "Olesia",
            surname: "Nikonova",
            country: 1,
          })
        : reject({
            user: {
              password: ["Это поле не может быть пустым."],
            },
            phone: ["Клиент с таким Телефон уже существует."],
            country_key: ["Это поле не может быть пустым."],
          });
    }, 2000);
  });
};
