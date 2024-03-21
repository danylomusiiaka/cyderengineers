import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function MainPage() {
    const [email, setEmail] = useState("");
    const [tests, setTests] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        Axios.get("http://localhost:3001/adduser").then((response) => {
            setEmail(response.data.user.email);
        });

        Axios.get("http://localhost:3001/tests").then((response) => {
            setTests(response.data);
        });
    });

    const categories = Array.from(new Set(tests.map(test => test.option)));

    const filteredTests = tests.filter((test) =>
        (!selectedCategory || test.option === selectedCategory) &&
        test.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const userTests = filteredTests.filter((test) => test.author === email);
    const otherTests = filteredTests.filter((test) => test.author !== email);


    const handleDeleteTest = (testId, author) => {
        if (author === email) {
            Axios.delete(`http://localhost:3001/tests/${testId}`);
            Axios.get("http://localhost:3001/tests").then((response) => {
                setTests(response.data);
            });
        }
    };

    return (
        <section className="container" style={{ 'margin-top': '30px' }}>
            <nav className="navbar">
                <h2 className="text-break" style={{ 'font-weight': '600' }}>Вибери гру для себе</h2>
                <div className="d-flex align-items-center">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Пошук..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <div className="dropdown">
                        <button className="btn dropdown-toggle" data-bs-toggle="dropdown">
                            {selectedCategory ? selectedCategory : "Категорія"}
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <a className="dropdown-item" onClick={() => setSelectedCategory(null)}>
                                    Всі
                                </a>
                            </li>
                            {categories.map((category, index) => (
                                <li key={index}>
                                    <a
                                        className={`dropdown-item${selectedCategory === category ? ' active' : ''}`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Link className="btn sign-in add-btn" style={{ color: 'white' }} to="/create-test">
                        Додати
                    </Link>
                </div>
            </nav>

            {userTests.length > 0 && (
                <div className="col-12">
                    <h3>Ваші створені тести:</h3>
                </div>
            )}

            <div className="row cards">
                {userTests.map((test) => (
                    <>
                        <div key={test._id} className="col-md-4 col-sm-6">
                            <div>
                                <img src="mainpage/crown.jpg" alt="" className='crown' />
                                18/40
                            </div>
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
                    </>
                ))}
            </div>

            <div className="row cards">
                {otherTests.length > 0 && (
                    <div className="col-12">
                        <h3>Доступні тести:</h3>
                    </div>
                )}
                {otherTests.map((test) => (
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
                {userTests.length === 0 && otherTests.length === 0 && (
                    <div className="col-12">
                        <h3>Ви ще не створили жодного тесту</h3>
                    </div>
                )}
            </div>

        </section>
    );
}

export default MainPage;
