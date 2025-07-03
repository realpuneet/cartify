import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loadUser: (state, action)=>{
            state.user = action.payload;
        },
        removeUser: (state, action) => {
            state.user = null;
        },
    },
});

export default userSlice.reducer;
export const { loadUser, removeUser} = userSlice.actions;