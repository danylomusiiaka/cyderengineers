import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function Header() {
    const [email, setEmail] = useState("")

    Axios.defaults.withCredentials = true


    useEffect(() => {
        Axios.get("http://localhost:3001/adduser").then((response) => {
            setEmail(response.data.user.email);
        });
    }, []);

    return (
        <header class="navbar navbar-light bg-light px-4">

            {email ? (
                <>
                    <Link class="navbar-brand h1" to="/main">Yukis</Link>
                    <div class="form-inline">
                        <div>
                            Hello, {email}!
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Link class="navbar-brand h1" to="/">Yukis</Link>
                    <div class="form-inline">
                        <Link className="btn login mx-2" to="/login">Log in</Link>
                        <Link className="btn sign-in" to="/sign-up">Sign up</Link>
                    </div>
                </>
            )}


        </header>
    )
}

export default Header