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
import ServerError from "./components/ServerError";
import EmailVerification from "./pages/EmailVerification";

function App() {
  const { isAuth, isLoading, error } = useAuth();

  return (
    <Router>
      <Header />
      {error && <ServerError/>}
      {!isLoading && (
        <Routes>
          <Route path='/' element={isAuth ? <MainPage /> : <WelcomePage />} />
          <Route path='/login' element={isAuth ? <MainPage /> : <LoginPage />} />
          <Route
            path='/sign-up'
            element={isAuth ? <MainPage /> : <SignUpPage />}
          />
          <Route path='/create-test' element={isAuth ? <CreateTest /> : <WelcomePage />} />
          <Route path='/profile' element={isAuth ? <Profile /> : <WelcomePage />} />
          <Route path='/email-verification' element={ <EmailVerification/>} />
        </Routes>
      )}
    </Router>
  );
}

export default function WrappedApp() {
  return (
    <AuthProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </AuthProvider>
  );
}
