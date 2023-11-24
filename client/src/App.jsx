import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage'
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import MainPage from './components/MainPage';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<WelcomePage />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/sign-up" exact element={<SignUpPage />} />
          <Route path="/main" exact element={<MainPage />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
