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

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("http://localhost:3001/adduser").then((response) => {
      setAuth(response.data.loggedIn);
      setLoading(false); 
    });
  }, []);
  return (
    <>
      <Router>
        <Header setAuth={setAuth} />
        {!isLoading && (
          <Routes>
            <Route path="/" element={isAuth ? <MainPage isAuth={isAuth} setAuth={setAuth} /> : <WelcomePage />} />
            <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Routes>
        )}
      </Router>
    </>
  )
}

export default App;
