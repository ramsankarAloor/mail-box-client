import { createSlice } from "@reduxjs/toolkit"

const initialState = { sentMails: []}

const sentMailsSlice = createSlice({
    name : 'sentMails',
    initialState,
    reducers : {
        getSentMails(state, action){
            state.sentMails = action.payload
        },
    }
})
export const sentMailsActions =  sentMailsSlice.actions
export default sentMailsSlice.reducer