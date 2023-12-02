import { useEffect, useState } from 'react';
import Axios from 'axios';

function MainPage() {
    const [email, setEmail] = useState("")

    Axios.defaults.withCredentials = true

    useEffect(() => {
        Axios.get("http://localhost:3001/adduser").then((response) => {
            setEmail(response.data.user.email);
        });
    });

    return (
        <div>Hello, {email}!</div>
    );
}

export default MainPage;
