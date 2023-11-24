import { Link } from 'react-router-dom';

function Header() {
    return (
        <header class="navbar navbar-light bg-light px-4">
            <Link class="navbar-brand h1" to="/">Yukis</Link>
            <div class="form-inline">
                <Link className="btn login mx-2" to="/login">Log in</Link>
                <Link className="btn sign-in" to="/sign-up">Sign up</Link>
            </div>
        </header>
    )
}

export default Header