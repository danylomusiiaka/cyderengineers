import { Link } from "react-router-dom";
import Axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/header.css";
import { useRef } from "react";

export default function Header() {
  const navCheckboxRef = useRef(null);

  const closeNav = () => {
    if (navCheckboxRef.current) {
      navCheckboxRef.current.checked = false;
    }
  };

  Axios.defaults.withCredentials = true;

  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  const navbarBgClass = isAuth ? "bg-authenticated" : "bg-unauthenticated";

  return (
    <header className={`${navbarBgClass}`}>
      <div className='logo'>
        <Link className='navbar-brand h1' to='/'>
          Yukis
        </Link>
        <nav className='nav-default'>
          <ul>
            <li>
              <Link className='link' to='/'>
                Наш проєкт
              </Link>
            </li>
            <li>
              <Link className='link' to='/'>
                Рейтинг учасників
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {!isAuth ? (
        <nav className='nav-default'>
          <Link className='btn login' to='/login'>
            Вхід
          </Link>
          <Link className='btn sign-in' to='/sign-up'>
            Реєстрація
          </Link>
        </nav>
      ) : (
        <nav className='nav-default'>
          <Link className='utils' to='/profile'>
            <img className='user' src='profile/user icon.png' alt='Profile' />
          </Link>
          <button className='utils'>
            <img className='setting' src='profile/settings.png' alt='Settings' />
          </button>
        </nav>
      )}

      <input type='checkbox' id='nav_check' hidden ref={navCheckboxRef} />
      <label htmlFor='nav_check' className='hamburger'>
        <div></div>
        <div></div>
        <div></div>
      </label>
      <nav className='nav-hamburg'>
        <div className='logo'>
          <Link className='navbar-brand h1' to='/' onClick={closeNav}>
            Yukis
          </Link>
        </div>
        <ul>
          <li>
            <Link className='link' to='/' onClick={closeNav}>
              Наш проєкт
            </Link>
          </li>
          <li>
            <Link className='link' to='/' onClick={closeNav}>
              Рейтинг учасників
            </Link>
          </li>
          {isAuth ? (
            <li className='buttons'>
              <Link className='utils' to='/profile' onClick={closeNav}>
                <img className='user' src='profile/user icon.png' alt='Profile' />
              </Link>
              <button className='utils' onClick={closeNav}>
                <img className='setting' src='profile/settings.png' alt='Settings' />
              </button>
            </li>
          ) : (
            <li className='buttons'>
              <Link className='btn login' to='/login' onClick={closeNav}>
                Вхід
              </Link>
              <Link className='btn sign-in' to='/sign-up' onClick={closeNav}>
                Реєстрація
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
