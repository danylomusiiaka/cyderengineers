import { useState } from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <section className='border row align-items-center mx-0' style={{ padding: "40px 0px " }}>
      <div className='col-md-3 justify-content-start d-xl-flex d-none px-0'>
        <img src='welcomepage/first.png' alt='welcome images' />
      </div>
      <div className='col-xl-6 text-center first-info'>
        <div className='row justify-content-center'>
          <h1>Долучайтеся до культурного відкриття України!</h1>
          <p>
            Вивчайте українську спадщину через захоплюючі тести та вікторини, <br />
            отримуйте нагороди та розширюйте свої знання про культуру та мову України.
            <span style={{ color: "#00D0C5" }}> 🌍📚</span>
          </p>
        </div>
        <div className='row justify-content-center'>
          <div className='col-md-9'>
            <form className='input-group'>
              <input
                type='email'
                className='form-control'
                placeholder='Введіть вашу пошту...'
                value={email}
                onChange={handleInputChange}
                autoFocus
                autoComplete='email'
              />
              <Link to={`/sign-up?email=${email}`} className='btn input-group-append'>
                Реєстрація
              </Link>
            </form>
          </div>
        </div>
      </div>
      <div className='col-md-3 justify-content-end d-xl-flex d-none px-0'>
        <img src='welcomepage/second.png' alt='welcome images' />
      </div>
    </section>
  );
}

export default WelcomePage;
