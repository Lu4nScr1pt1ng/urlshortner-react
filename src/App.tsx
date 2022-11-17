import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { AuthProvider } from './context/auth';
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import PrivateRoutes from './utils/PrivateRoutes';
import Register from './pages/auth/Register';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ShowLink from './components/Dashboard/ShowLink';
import Go from './components/Go/Go';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route element={ <Go />} path="/go/:urlid" />
            <Route element={<><Header /> <Home /></>} path="/" />
            <Route element={<><Header /> <Login /></>} path="/login" />
            <Route element={<><Header /> <Register /></>} path="/register" />
            <Route element={<PrivateRoutes />}>
              <Route element={<><Header /> <Dashboard /></>} path="/dashboard" />
              <Route element={<><Header /> <ShowLink /></>} path="/dashboard/:urlid" />
            </Route>
          </Routes>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
