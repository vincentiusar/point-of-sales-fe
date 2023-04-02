import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { BotNavBar, SideNavbar } from "../components";
import { Menu, Transaction, Authenticating, Landing, Dashboard, ChooseRestaurant, TableIndex, AddTable, DetailTable } from "../pages";
import { persistor, store } from "../redux/store";
import ProtectingRoute from "./protectingRoute";
import ProtectingStaffRoute from "./protectingStaffRoute";
import AdminProtectingRoute from "./adminProtectingRoute";
import { Layout } from "antd";

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
                            path="/customer/menu"
                            element={
                                <ProtectingRoute>
                                    <Menu />
                                    <BotNavBar />
                                </ProtectingRoute>
                            }
                        />

                        <Route
                            path="/customer/transaction"
                            element={
                                <ProtectingRoute>
                                    <Transaction />
                                    <BotNavBar />
                                </ProtectingRoute>
                            }
                        />
                    
                        <Route
                            path="/restaurant"
                            element={
                                <AdminProtectingRoute>
                                    <ChooseRestaurant />
                                </AdminProtectingRoute>
                            }
                        />

                        <Route
                            path="restaurant/:id/dashboard"
                            element={
                                <ProtectingStaffRoute>
                                    <Layout
                                        style={{
                                            minHeight: '100vh',
                                        }}
                                    >
                                        <SideNavbar />
                                        <Dashboard />
                                    </Layout>
                                </ProtectingStaffRoute>
                            }
                        />

                        <Route
                            path="restaurant/:id/table"
                            element={
                                <ProtectingStaffRoute>
                                    <Layout
                                        style={{
                                            minHeight: '100vh',
                                        }}
                                    >
                                        <SideNavbar />
                                        <TableIndex />
                                    </Layout>
                                </ProtectingStaffRoute>
                            }
                        />

                        <Route
                            path="restaurant/:id/table/:table_id"
                            element={
                                <ProtectingStaffRoute>
                                    <Layout
                                        style={{
                                            minHeight: '100vh',
                                        }}
                                    >
                                        <SideNavbar />
                                        <DetailTable />
                                    </Layout>
                                </ProtectingStaffRoute>
                            }
                        />
                        
                        <Route
                            path="/restaurant/:id/table/add"
                            element={
                                <AdminProtectingRoute>
                                    <Layout
                                        style={{
                                            minHeight: '100vh',
                                        }}
                                    >
                                        <SideNavbar />
                                        <AddTable />
                                    </Layout>
                                </AdminProtectingRoute>
                            }
                        />
                    </Routes>
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default Routers;