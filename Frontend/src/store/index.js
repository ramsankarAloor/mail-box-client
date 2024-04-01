import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import mailsReducer from "./mails";
import sentMailsReducer from "./sentMails";
import openMailReducer from "./openMail"

const store = configureStore({
  reducer: {
    auth: authReducer,
    mails: mailsReducer,
    sentMails: sentMailsReducer,
    openMail: openMailReducer
  },
});

export default store;
