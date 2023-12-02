import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage'
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import MainPage from './components/MainPage';
import { useEffect, useState } from 'react';
import Axios from 'axios';

function App() {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/adduser").then((response) => {
      console.log(response);
      setAuth(response.data.loggedIn);
    });
  });

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={isAuth ? <MainPage isAuth={isAuth} setAuth={setAuth} /> : <WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage setAuth={setAuth} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
