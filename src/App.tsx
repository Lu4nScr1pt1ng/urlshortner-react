import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./context/auth";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import PrivateRoutes from "./utils/PrivateRoutes";
import Register from "./pages/auth/Register";

function App() {

  return (
    <>
        <AuthProvider>
            <Header />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Login/>} path="/login" />
                <Route element={<Register/>} path="/register" />
                <Route element={<PrivateRoutes />}>
                    <Route element={<Dashboard />} path="/dashboard" />
                </Route>
            </Routes>
        </AuthProvider>
    </>
  );
}

export default App;