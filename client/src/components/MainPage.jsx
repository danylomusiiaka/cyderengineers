import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function MainPage() {
    const [email, setEmail] = useState("")

    Axios.defaults.withCredentials = true

    useEffect(() => {
        Axios.get("http://localhost:3001/adduser").then((response) => {
            setEmail(response.data.user.email);
        });

    });


    return (
        <section class="container">
            <h2>Привіт, {email}!</h2>
            <nav class="navbar">
                <h2 class="navbar-brand">Доступні тести: </h2>
                <div class="d-flex align-items-center">
                    <input type="text" class="form-control" placeholder="Пошук..." />
                    
                    <div class="dropdown">
                        <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
                            Категорія
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Культура</a></li>
                            <li><a class="dropdown-item" href="#">Мова</a></li>
                            <li><a class="dropdown-item" href="#">Історія</a></li>
                        </ul>
                    </div>

                    <Link class="btn sign-in" style={{ color: 'white' }} to="/create-test">
                        Додати
                    </Link>
                </div>
            </nav>


            <div class="row">
                <div class="col-md-4 col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Заголовок</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn login">Обрати</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Заголовок</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn login">Обрати</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Заголовок</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn login">Обрати</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MainPage;
