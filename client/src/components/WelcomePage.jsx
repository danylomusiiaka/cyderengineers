import { useState } from "react";
import { Link } from 'react-router-dom';

function WelcomePage({ setEmailFromWelcome }) {
    const [email, setEmail] = useState('');

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <section className="border row align-items-center mx-0" style={{ padding: '40px 0px ' }}>
            <div className="col-md-3 justify-content-start d-xl-flex d-none px-0">
                <img src="welcomepage/first.png" alt="welcome images" /> 
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
                <img src="welcomepage/second.png" alt="welcome images" />
            </div>
            <div className="d-flex flex-column align-items-center gap-5" style={{ marginTop: "20px" }}>
                <div className="d-flex justify-content-between align-items-center flex-row-reverse" style={{ width: "100%", maxWidth: "1200px" }}>
                    <p className="firstparagraph" style={{ flex: "1", marginRight: "20px", fontSize: "23px", textAlign: "justify" }}>
                        Yukis - це унікальна платформа для всіх, хто прагне поглибити свої знання з культури України та української історії. Ми пропонуємо широкий спектр тестів, які охоплюють різні аспекти нашої національної спадщини, від стародавніх часів до сучасності.
                    </p>
                    <img src="welcomepage/ukraine.png" alt="" style={{ flexShrink: "0", width: "600px", height: "auto", marginRight: "60px" }} />
                </div>

                <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", maxWidth: "1200px" }}>
                    <p className="secondparagraph" style={{ flex: "1", marginLeft: "20px", fontSize: "23px", textAlign: "justify" }}>
                        Кожен тест складається з декількох питань, на які користувач повинен відповісти. Після проходження тесту ви одразу дізнаєтеся свій результат, а також отримаєте детальні пояснення щодо правильних відповідей, що допоможе вам краще зрозуміти матеріал.
                    </p>
                    <img src="welcomepage/result.png" alt="" style={{ flexShrink: "0", width: "215px", height: "auto", marginLeft: "60px" }} />
                </div>

                <div className="d-flex justify-content-between align-items-center flex-row-reverse" style={{ width: "100%", maxWidth: "1200px" }}>
                    <p className="thirdparagraph" style={{ flex: "1", marginRight: "20px", fontSize: "23px", textAlign: "justify" }}>
                        За кожну правильну відповідь ви отримуєте бали. Накопичуйте бали, щоб підвищувати свій рейтинг серед інших користувачів. Це додає елемент змагання та мотивації для подальшого навчання.
                    </p>
                    <img src="welcomepage/achievment.png" alt="" style={{ flexShrink: "0", width: "175px", height: "auto", marginRight: "60px" }} />
                </div>
            </div>


        </section>
    );
}

export default WelcomePage;
