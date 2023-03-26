import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    token: null,
    name: null,
    role_id: null,
    username: null,
    id: null,
    restaurant_id: null,
}

export const sliceUser = createSlice({
    name: "user",
    initialState: {
        users: initialValue
    },
    reducers: {
        saveUser: (state, action) => {
            const newUser = {...action.payload}
            state.users = newUser
        },
        deleteUser: (state) => {
            state.users = initialValue
        }
    }
})

export const { saveUser, deleteUser } = sliceUser.actions;
export default sliceUser.reducer;