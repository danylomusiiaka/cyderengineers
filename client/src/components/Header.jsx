import { Link } from "react-router-dom";
import Axios from "axios";
import { useAuth } from "../context/AuthContext";

function Header() {
  Axios.defaults.withCredentials = true;

  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return null;
    }
    
  const navbarBgClass = isAuth ? "bg-authenticated" : "bg-unauthenticated";

  return (
    <header className={`navbar navbar-light bg-light px-4 ${navbarBgClass}`}>
      <div className='navbar-left'>
        <Link className='navbar-brand h1' to='/'>
          Yukis
        </Link>
        <Link className='links' to='/'>
          Наш проєкт
        </Link>
        <Link className='links' to='/'>
          Твій рейтинг
        </Link>
      </div>

      <div className='form-inline'>
        {isAuth ? (
          <>
            <Link className='utils' to='/profile'>
              <img className='user' src='profile/user icon.png' alt='Profile' />
            </Link>
            <button className='utils'>
              <img className='setting' src='profile/settings.png' alt='Settings' />
            </button>
          </>
        ) : (
          <>
            <Link className='btn login mx-2' to='/login'>
              Log in
            </Link>
            <Link className='btn sign-in' to='/sign-up'>
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
