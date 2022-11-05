import { defineStore } from "pinia";

export const useStore = defineStore("Store", {
  state: () => ({
    users: [
      {
        id: 1,
        userName: "tusharpansuriya16",
        name: "tushar Pansuriya",
        Post: "emnployee",
        number: 8780167092,
        email: "tusharpansuriya16@gmail.com",
        password: "tushar123",
        userImg:
          "https://media-exp1.licdn.com/dms/image/C5603AQGWd5VoM3VUTQ/profile-displayphoto-shrink_400_400/0/1660236820813?e=1669248000&v=beta&t=hHZNe1ZFKBfEh3s3rab2OF6EDWzNSw3L9wkpVA64I1o",
      },
      {
        id: 2,
        Post: "admin",
        userName: "rajukhunt15",
        number: 8487088198,
        email: "rajukhunt15@gmail.com",
        password: "raju@123",
        userImg:
          "https://pbs.twimg.com/profile_images/1399036650643099649/KJkV_Ct3_400x400.jpg",
      },
      {
        id: 3,
        userName: "ravibhesaniya14",
        name: "Ravi Bhesaniya",
        Post: "emnployee",
        number: 7043092618,
        email: "ravibhesaniya14@gmail.com",
        password: "ravi@123",
        userImg: "",
      },
    ],
    logInUsers: null,
    SettingBtn: false,
  }),
  actions: {
    login(payload) {
      const logInUsers = this.users.find(
        (e) =>
          // e.email == payload.userName ||
          // e.number == payload.userName ||
          e.userName == payload.userName && e.password == payload.userPassword
      );
      if (logInUsers) {
        this.logInUsers = logInUsers;
        return logInUsers;
      } else throw "Sorry username and password is wrong";
    },
    accountSettingBtn() {
      if (this.logInUsers) {
        this.SettingBtn = true;
      }
    },
  },
  getters: {},
});
