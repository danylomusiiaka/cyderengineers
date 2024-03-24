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
            <div className="d-flex flex-column justify-content-center gap-5" style={{marginTop:"50px" }} >
                <div className="d-flex justify-content-between" style={{padding: "0px 250px 0 150px"}}>
                    <p class="firstparagraph">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias quos maxime repellat eligendi mollitia error, labore fuga fugiat officia enim ex sequi quis nostrum corporis exercitationem sunt molestias culpa dolorem? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam aspernatur vero enim aliquid dolores, maiores atque ea ab id eaque molestias ipsum, ducimus corrupti iusto quo quas nisi facere sapiente. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque explicabo eius sed temporibus laborum. Placeat ab accusantium expedita inventore consequuntur cumque tempore quae possimus, magnam saepe enim? Id, ullam officiis.</p>
                    <img src="welcomepage/memorial.jpg" alt="" />
                </div>

                <div className="d-flex justify-content-between" style={{padding: "0px 150px 0 250px"}}>
                    <img src="welcomepage/church.jpg" alt="" />
                    <p class="secondparagraph">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias quos maxime repellat eligendi mollitia error, labore fuga fugiat officia enim ex sequi quis nostrum corporis exercitationem sunt molestias culpa dolorem? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam aspernatur vero enim aliquid dolores, maiores atque ea ab id eaque molestias ipsum, ducimus corrupti iusto quo quas nisi facere sapiente. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque explicabo eius sed temporibus laborum. Placeat ab accusantium expedita inventore consequuntur cumque tempore quae possimus, magnam saepe enim? Id, ullam officiis.</p>
                </div>
                
                <div className="d-flex justify-content-between" style={{padding: "0px 250px 0 150px"}}>
                    <p class="thirdparagraph">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias quos maxime repellat eligendi mollitia error, labore fuga fugiat officia enim ex sequi quis nostrum corporis exercitationem sunt molestias culpa dolorem? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam aspernatur vero enim aliquid dolores, maiores atque ea ab id eaque molestias ipsum, ducimus corrupti iusto quo quas nisi facere sapiente. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque explicabo eius sed temporibus laborum. Placeat ab accusantium expedita inventore consequuntur cumque tempore quae possimus, magnam saepe enim? Id, ullam officiis.</p>
                    <img src="welcomepage/castle.jpg" alt="" />
                </div>
            </div>
        </section>
    );
}

export default WelcomePage;
