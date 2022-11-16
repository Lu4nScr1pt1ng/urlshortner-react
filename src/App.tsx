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
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ShowLink from './components/Dashboard/ShowLink';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<PrivateRoutes />}>
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<ShowLink />} path="/dashboard/:urlid" />
            </Route>
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
