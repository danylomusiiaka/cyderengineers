import { Link } from 'react-router-dom';
import Axios from 'axios';

function Header({ isAuth }) {
    
    Axios.defaults.withCredentials = true

    const navbarBgClass = isAuth ? 'bg-authenticated' : 'bg-unauthenticated';

    return (
        <header className={`navbar navbar-light bg-light px-4 ${navbarBgClass}`}>
            <Link className="navbar-brand h1" to="/">Yukis</Link>
            <div className="form-inline">
                {isAuth ? (
                    <>
                        <Link className="utils" to="/profile">
                            <img class="user" src="profile/user icon.png" />
                        </Link>
                        <button className="utils">
                            <img className="setting" src="profile/settings.png" />
                        </button>
                    </>
                ) : (
                    <>
                        <Link className="btn login mx-2" to="/login">Log in</Link>
                        <Link className="btn sign-in" to="/sign-up">Sign up</Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header
