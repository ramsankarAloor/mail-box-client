import { createSlice } from "@reduxjs/toolkit";

const openMailSlice = createSlice({
    name : 'openMail',
    initialState: {open : {}},
    reducers : {
        openMail(state, action){
            state.open = action.payload
        },
        closeMail(state){
            state.open = {}
        }
    }
})

export const openMailActions = openMailSlice.actions
export default openMailSlice.reducer