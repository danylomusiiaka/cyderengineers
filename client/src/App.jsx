import { AuthProvider, useAuth } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import CreateTest from "./pages/СreateTest";
import Profile from "./pages/Profile";
import { useState } from "react";

function App() {
  const [emailFromWelcome, setEmailFromWelcome] = useState("");
  const { isAuth, isLoading } = useAuth();

  return (
    <Router>
      <Header />
      {!isLoading && (
        <Routes>
          <Route
            path='/'
            element={
              isAuth ? <MainPage /> : <WelcomePage setEmailFromWelcome={setEmailFromWelcome} />
            }
          />
          <Route path='/login' element={isAuth ? <MainPage /> : <LoginPage />} />
          <Route
            path='/sign-up'
            element={isAuth ? <MainPage /> : <SignUpPage emailFromWelcome={emailFromWelcome} />}
          />
          <Route path='/create-test' element={<CreateTest />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      )}
    </Router>
  );
}

export default function WrappedApp() {
  return (
    <AlertProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AlertProvider>
  );
}
