import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    transaction_id: null,
    restaurant: null,
    table_id: null,
}

export const sliceTransaction = createSlice({
    name: "transaction",
    initialState: {
        transaction: initialValue
    },
    reducers: {
        saveTransaction: (state, action) => {
            const transaction = {...action.payload}
            state.transaction = transaction
        },
        deleteTransaction: (state) => {
            state.transaction = initialValue
        }
    }
})

export const { saveTransaction, deleteTransaction } = sliceTransaction.actions;
export default sliceTransaction.reducer;