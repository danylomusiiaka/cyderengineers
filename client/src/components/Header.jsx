import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Header({ setAuth }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")

    Axios.defaults.withCredentials = true

    useEffect(() => {
        Axios.get("http://localhost:3001/adduser").then((response) => {
            setEmail(response.data.user.email);

        });
    });

    const logout = async () => {
        await Axios.post("http://localhost:3001/logout");
        setEmail("");
        setAuth(false);
        navigate("/login");

    };

    return (
        <header className="navbar navbar-light bg-light px-4">
            <Link className="navbar-brand h1" to="/">Yukis</Link>
            <div className="form-inline">
                {email ? (
                    <button className="btn login mx-2" onClick={logout}>Log out</button>
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