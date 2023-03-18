import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sliceOrder from "./sliceOrder";
import sliceTransaction from "./sliceTransaction";
import sliceUser from "./sliceUser";

const reducer = combineReducers({
    user: sliceUser,
    transaction: sliceTransaction,
    order: sliceOrder,
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore(
    {
        reducer: persistedReducer,
        middleware: [
            ...getDefaultMiddleware({
                serializableCheck: false
            }),
        ]
    }
);
const persistor = persistStore(store);

export { store, persistor };