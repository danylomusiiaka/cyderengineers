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
    });

    return (
        <header className="navbar navbar-light bg-light px-4">
            <Link className="navbar-brand h1" to="/">Yukis</Link>
            <div className="form-inline">
                {/* {email ? (
                    <div>
                        Hello, {email}!
                    </div>
                ) : (
                    <> */}
                        <Link className="btn login mx-2" to="/login">Log in</Link>
                        <Link className="btn sign-in" to="/sign-up">Sign up</Link>
                    {/* </>
                )} */}
            </div>
        </header>
    )
}

export default Header