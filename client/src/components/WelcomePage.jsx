import { useState } from "react";
import { Link } from 'react-router-dom';

function WelcomePage({ setEmailFromWelcome }) {
    const [email, setEmail] = useState('');

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <section className="border row align-items-center mx-0" style={{ height: '550px' }}>
            <div className="col-md-3 justify-content-start d-xl-flex d-none px-0">
                <img src="src/images/first.png" alt="hi" className="img-fluid" />
            </div>
            <div className="col-xl-6 text-center">
                <div className="row justify-content-center">
                    <h1>Долучайтеся до Культурного Відкриття України!</h1>
                    <p>Вивчайте українську спадщину через захоплюючі тести та вікторини, <br />отримуйте нагороди та розширюйте
                        свої знання про
                        культуру та мову України.
                        <span style={{ color: '#00D0C5' }}> 🌍📚</span>
                    </p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <form className="input-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Your email address..."
                                value={email}
                                onChange={handleInputChange}
                            />
                            <Link to={`/sign-up?email=${email}`} className="btn input-group-append">
                                Sign up
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-3 justify-content-end d-xl-flex d-none px-0" >
                <img src="src/images/second.png" alt="h" className="img-fluid" />
            </div>
        </section>
    );
}

export default WelcomePage;
