import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    UserExist: {
      _id: "",
    },
    id: "",
    name: "",
    token: "",
  },
});

export const chatState = atom({
  key: "chatState",
  default: {
    chatId: "",
    index: 0,
  },
});

export const allUser = atom({
  key :"allUser",
  default : [{
    _id : "",
    name : "",
  }]

})

export const rerender = atom({
  key : "rerender",
  default : false
})

export const notification = atom({
  key : "notification",
  
  default : [{
    chatId: "",
    senderId: "",
    senderName: "",
    message: "",
    read : true
  }],
})

export const chatList = atom({
  key : "chatList",
  default : []})