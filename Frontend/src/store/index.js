import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth'
import mailsReducer from './mails'
import sentMailsReducer from './sentMails'

const store = configureStore({
    reducer : {auth : authReducer, mails: mailsReducer, sentMails: sentMailsReducer}
})

export default store;