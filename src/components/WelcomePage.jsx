function WelcomePage() {
    return (
        <section className="border row align-items-center mx-0" style={{ height: '550px' }}>
                <div className="col-md-3 text-left d-xl-block d-none px-0">
                    <img src="src/images/first.png" alt="hi" className="img-fluid mx-auto" />
                </div>
                <div className="col-xl-6 text-center">
                    <div className="row justify-content-center">
                        <h1>Долучайтеся до Культурного Відкриття України!</h1>
                        <p>Вивчайте українську спадщину через захоплюючі тести та вікторини, <br />отримуйте нагороди та розширюйте
                            свої знання про
                            культуру та мову України.
                            <span style={{ color: '#00D0C5' }}>🌍📚</span>
                        </p>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-9">
                            <form className="input-group">
                                <input type="text" className="form-control" placeholder="Your email address..." />
                                <button type="button" className="btn input-group-append">Sign up</button>
                            </form>
                        </div>
                    </div>
                </div>
            <div className="col-md-3 text-right d-xl-block d-none px-0" >
                    <img src="src/images/second.png" alt="h" className="img-fluid mx-auto" />
                </div>
        </section>
    );
}

export default WelcomePage;
