import { createSlice } from "@reduxjs/toolkit"

const initialValue = [

];

export const sliceOrder = createSlice({
    name: "orders",
    initialState: {
        orders: initialValue
    },
    reducers: {
        saveOrder: (state, action) => {
            const orders = [...action.payload]
            state.orders = orders
        },
        deleteOrder: (state) => {
            state.orders = initialValue
        }
    }
})

export const { saveOrder, deleteOrder } = sliceOrder.actions;
export default sliceOrder.reducer;