function WelcomePage() {
    return (
        <main className="container border">
            <section className="row align-items-center" style={{ height: '500px' }}>
                <div className="col-md text-center">
                    <h1>Долучайтеся до Культурного Відкриття України!</h1>
                    <p>Вивчайте українську спадщину через захоплюючі тести та вікторини, <br />отримуйте нагороди та розширюйте
                        свої знання про
                        культуру та мову України.
                        <span style={{ color: '#00D0C5' }}>🌍📚</span>
                    </p>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form className="input-group">
                                <input type="text" className="form-control" placeholder="Your email address..." />
                                <button type="button" className="btn input-group-append">Sign up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default WelcomePage;
