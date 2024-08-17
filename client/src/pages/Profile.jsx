import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Profile() {
    const [email, setEmail] = useState("");
    const [tests, setTests] = useState([]);
     const { setAuth } = useAuth();
    const navigate = useNavigate();

    Axios.defaults.withCredentials = true

    useEffect(() => {
        Axios.get("http://localhost:3001/users/adduser").then((response) => {
            setEmail(response.data.user.email);
        });

        Axios.get("http://localhost:3001/tests").then((response) => {
            setTests(response.data);
        });
    });

    const logout = async () => {
        await Axios.post("http://localhost:3001/users/logout");
        setAuth(false);
        navigate("/login");
    };

    return (
        <>
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-sm-10">
                        <h1 class="Nickname">{email}</h1>
                        <p>
                            <img class="clock" src="profile/clock.png" /> Приєднався y квітні 2024
                        </p>
                    </div>
                    <div class="col">
                        <img class="user-2" src="profile/user icon.png" />
                        <button className="btn login mx-2" onClick={logout}>Log out</button>
                    </div>
                </div>
            </div>

            <div class="container main-info">
                <div class="row align-items-center">
                    <div class="col-sm-3">
                        <h3 class="static">Статистика</h3>
                        <div class="block-days">
                            <img class="fire" src="profile/fire_streak.png" alt="Group Icon" />
                            <span class="number">12</span>
                            <p class="description">Кількість днів</p>
                        </div>
                        <div class="liga">
                            <img class="lig-name" src="profile/liga.png" alt="Group Icon" />
                            <span class="number">Ліга</span>
                            <p class="description">Поточна ліга</p>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="block-points">
                            <img class="mack" src="profile/lightning.png" alt="Group Icon" />
                            <span class="number">100</span>
                            <p class="description">Кількість балів</p>
                        </div>
                        <div class="liga">
                            <img class="medal" src="profile/level.png" alt="Group Icon" />
                            <span class="number"><strong>11</strong></span>
                            <p class="description">Рівень</p>
                        </div>
                    </div>
                    <div class="col-xl">
                        <div class="friend">
                            <img src="profile/invite_friends.png" alt="Your Image" />
                            <div>
                                <p>Запросіть своїх друзів</p>
                                <p>Розкажи своїм друзям про YUkis</p>
                            </div>
                        </div>
                        <div class="friend-container">
                            <button>Запросити друзів</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Profile;