/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RiCloseFill, RiBarChartHorizontalLine } from 'react-icons/ri';
import useAuth from '../hooks/useAuth';
function Header() {
  const [bg, setBg] = useState(false);
  const { username, logout } = useAuth();
  const [navMobile, setNavMobile] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      return window.scrollY > 20 ? setBg(true) : setBg(false);
    });
  });

  function handleLogout() {
    logout();
  }

  const activeClassName = "underline-offset-4 underline"

  return (
    <header className={`${bg ? 'bg-white shadow-lg' : ''} fixed left-0 right-0 z-40 transition-all duration-200 `}>
      <div className="container mx-auto flex justify-between h-[70px] items-center">
        <div className="text-[18px] font-semibold">URL SHORTNER</div>
        <nav>
          <div
            className={` ${
              navMobile ? 'max-h-64' : 'max-h-0'
            } md:hidden absolute top-[4.1rem] w-[100%] mx-auto left-0 right-0 bg-accent font-bold transition-all overflow-hidden`}
          >
            <div>
              <ul className="text-white text-center flex flex-col gap-4 p-4">
                {username ? (
                  <>
                    <li>
                      <NavLink className={({ isActive }) => isActive ? activeClassName : undefined} onClick={() => setNavMobile(!navMobile)} to={'/'}>
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className={({ isActive }) => isActive ? activeClassName : undefined} onClick={() => setNavMobile(!navMobile)} to={'/dashboard'}>
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <Link
                        className='text-red-500 font-medium'
                        onClick={() => {
                          handleLogout();
                          setNavMobile(!navMobile);
                        }}
                        to={'/'}
                      >
                        Sair
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink className={({ isActive }) => isActive ? activeClassName : undefined} onClick={() => setNavMobile(!navMobile)} to={'/'}>
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className={({ isActive }) => isActive ? activeClassName : undefined} onClick={() => setNavMobile(!navMobile)} to={'/dashboard'}>
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className={({ isActive }) => isActive ? activeClassName : undefined} onClick={() => setNavMobile(!navMobile)} to={'/login'}>
                        Entrar
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className={({ isActive }) => isActive ? activeClassName : undefined} onClick={() => setNavMobile(!navMobile)} to={'/register'}>
                        Cadastrar
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div
            onClick={() => setNavMobile(!navMobile)}
            className="md:hidden text-2x1 mr-4 text-black cursor-pointer items-center justify-center"
          >
            {navMobile ? <RiCloseFill size={28} /> : <RiBarChartHorizontalLine size={28} />}
          </div>
          <ul className="hidden md:gap-[45px] md:flex">
            {username ? (
              <>
                <li className='text-blue-600'>Bem-vindo {username}</li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? activeClassName : undefined} to={'/'}>Home</NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? activeClassName : undefined} to={'/dashboard'}>Dashboard</NavLink>
                </li>
                <li>
                  <Link className='text-red-500 font-bold' onClick={handleLogout} to={'/'}>
                    Sair
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink className={({ isActive }) => isActive ? activeClassName : undefined}  to={'/'}>Home</NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? activeClassName : undefined} to={'/dashboard'}>Dashboard</NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? activeClassName : undefined} to={'/login'}>Entrar</NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? activeClassName : undefined} to={'/register'}>Cadastrar</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
