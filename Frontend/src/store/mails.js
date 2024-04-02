import { createSlice } from "@reduxjs/toolkit"

const initialState = { mails: [], unread : 0}

const mailsSlice = createSlice({
    name : 'mails',
    initialState,
    reducers : {
        getMails(state, action){
            state.mails = action.payload
        },
        setUnread(state, action){
            state.unread = action.payload
        }
    }
})
export const mailsActions =  mailsSlice.actions
export default mailsSlice.reducer