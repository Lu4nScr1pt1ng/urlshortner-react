import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./context/auth";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {

  return (
    <>
        <AuthProvider>
            <Header />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Login/>} path="/login" />
                <Route element={<PrivateRoutes />}>
                    <Route element={<Dashboard />} path="/dashboard" />
                </Route>
            </Routes>
        </AuthProvider>
    </>
  );
}

export default App;