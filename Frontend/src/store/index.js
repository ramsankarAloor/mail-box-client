import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth'
import mailsReducer from './mails'

const store = configureStore({
    reducer : {auth : authReducer, mails: mailsReducer}
})

export default store;