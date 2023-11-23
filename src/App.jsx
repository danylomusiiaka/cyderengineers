import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WelcomePage from './components/WelcomePage'
import LoginPage from './components/LoginPage';

function App() {
  return (
    <>
      <Router>
          <Header />
        <Routes>
          <Route path="/" exact element={<WelcomePage />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/" exact element={<WelcomePage />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
