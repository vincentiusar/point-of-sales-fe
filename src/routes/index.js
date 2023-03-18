import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { BotNavBar } from "../components";
import { Menu, Transaction, Authenticating, Landing } from "../pages";
import { persistor, store } from "../redux/store";
import ProtectingRoute from "./protectingRoute";

const Routers = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Routes>
                        <Route
                            path="/auth"
                            element={
                                <Authenticating />
                            }
                        />

                        <Route
                            path="/"
                            element={
                                <Landing />
                            }
                        />
                        
                        <Route
                            path="/restaurant/:restaurant_id/table/:table_id/menu"
                            element={
                                <ProtectingRoute>
                                    <Menu />
                                    <BotNavBar />
                                </ProtectingRoute>
                            }
                        />

                        <Route
                            path="/restaurant/:restaurant_id/table/:table_id/transaction"
                            element={
                                <ProtectingRoute>
                                    <Transaction />
                                    <BotNavBar />
                                </ProtectingRoute>
                            }
                        />
                    
                    </Routes>
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default Routers;