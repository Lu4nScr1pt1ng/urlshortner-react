/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
function Header() {
//   const [bg, setBg] = useState(false);
  const { username, logout } = useAuth();

//   useEffect(() => {
//     window.addEventListener('scroll', () => {
//       return window.scrollY > 40 ? setBg(true) : setBg(false);
//     });
//   });

  function handleLogout() {
    logout();
  }



  return (
    <header className="flex justify-around">
      <div className="logo">LOGO</div>
      <nav>
        <ul className="flex gap-4">
          {username ? (
            <>
              <li>Bem-vindo {username}</li>
              <li><Link to={"/"}>Home</Link></li>
              <li><Link to={"/dashboard"}>Dashboard</Link></li>
              <li><Link onClick={handleLogout} to={"/"}>Sair</Link></li>
            </>
          ) : (
            <>
              <li><Link to={"/"}>Home</Link></li>
              <li><Link to={"/dashboard"}>Dashboard</Link></li>
              <li><Link to={"/login"}>Entrar</Link></li>
              <li><Link to={"/register"}>Cadastrar</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
