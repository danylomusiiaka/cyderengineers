import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Profile() {
    const [email, setEmail] = useState("");
    const [tests, setTests] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/adduser").then((response) => {
            setEmail(response.data.user.email);
        });

        Axios.get("http://localhost:3001/tests").then((response) => {
            setTests(response.data);
        });
    });

    const filteredTests = tests.filter((test) =>
        (!selectedCategory || test.option === selectedCategory) &&
        test.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const userTests = filteredTests.filter((test) => test.author === email);

    const handleDeleteTest = (testId, author) => {
        if (author === email) {
            Axios.delete(`http://localhost:3001/tests/${testId}`);
            Axios.get("http://localhost:3001/tests").then((response) => {
                setTests(response.data);
            });
        }
    };

    return (
        <>
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-sm-10">
                        <h1 class="Nickname">{email}</h1>
                        <p>
                            <img class="clock" src="profile/clock.png" /> Приєднався у квітні 2024
                        </p>
                    </div>
                    <div class="col">
                        <img class="user-2" src="profile/user icon.png" />
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

            <div className='container main-info about-user-tests'>
                <div className="row cards">
                    <div className="col-12">
                        <h3>Ваші створені тести:</h3>
                    </div>
                    {userTests.map((test) => (
                        <div key={test._id} className="col-md-4 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{test.name}</h5>
                                    <p className="card-text">{test.description}</p>
                                    <p>{test.option}</p>
                                    <Link className="btn login" to={`/view-test/${test._id}`}>
                                        Обрати
                                    </Link>
                                    {test.author === email && (
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteTest(test._id, test.author)}
                                        >
                                            Видалити
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {userTests.length === 0 && (
                    <div className="col-12">
                        <h3>Ви ще не створили жодного тесту</h3>
                    </div>
                )}
            </div>
        </>
    );
}

export default Profile;