import { createSlice } from "@reduxjs/toolkit"

const initialState = { mails: []}

const mailsSlice = createSlice({
    name : 'mails',
    initialState,
    reducers : {
        getMails(state, action){
            state.mails = action.payload
        }
    }
})
export const mailsActions =  mailsSlice.actions
export default mailsSlice.reducer