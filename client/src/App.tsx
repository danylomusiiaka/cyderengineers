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
import Rating from "./pages/Rating";
import ServerError from "./components/ServerError";
import EmailVerification from "./pages/EmailVerification";
import { useRenderCount } from "@uidotdev/usehooks";
import Quiz from "./pages/Quiz";

function App() {
  const { isAuth, isLoading, error } = useAuth();
  //const renderCount = useRenderCount();

  return (
    <Router>
      {/* <p>Render Count: {renderCount}</p> */}
      <Header />
      {error && <ServerError />}
      {!isLoading && (
        <Routes>
          <Route path='/' element={isAuth ? <MainPage /> : <WelcomePage />} />
          <Route path='/login' element={isAuth ? <MainPage /> : <LoginPage />} />
          <Route path='/sign-up' element={isAuth ? <MainPage /> : <SignUpPage />} />
          <Route path='/create-test' element={isAuth ? <CreateTest /> : <WelcomePage />} />
          <Route path='/profile' element={isAuth ? <Profile /> : <WelcomePage />} />
          <Route path='/email-verification' element={<EmailVerification />} />
          <Route path='/rating' element={<Rating />} />
          <Route path='/quiz' element={<Quiz />} />
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
