import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage'
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import MainPage from './components/MainPage';
import CreateTest from './components/СreateTest'
import { useEffect, useState } from 'react';
import Axios from 'axios';

function App() {
  const [isAuth, setAuth] = useState(false);
  const [emailFromWelcome, setEmailFromWelcome] = useState('');
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
        <Header isAuth={isAuth} setAuth={setAuth} />
        {!isLoading && (
          <Routes>
            <Route
              path="/"
              element={
                isAuth ? (
                  <MainPage isAuth={isAuth} setAuth={setAuth} />
                ) : (
                  <WelcomePage setEmailFromWelcome={setEmailFromWelcome} />
                )
              }
            />
            <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
            <Route
              path="/sign-up"
              element={<SignUpPage emailFromWelcome={emailFromWelcome} />}
            />
            <Route path="create-test" element={<CreateTest />} />
          </Routes>
        )}
      </Router>
    </>
  )
}

export default App;
