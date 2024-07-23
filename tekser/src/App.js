import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "./components/pages/profile";
import CheckEmail from "./components/auth/checkEmail";
import ConfirmReset from "./components/auth/confirmReset";
import Login from "./components/auth/login";
import UploadImage from "./components/pages/uploadImage";
import Setting from "./components/pages/setting";
import Success from "./components/pages/success";
import Contact from "./components/pages/contact";
import Landing from "./components/pages/landing";
import Privacy from "./components/pages/privacy";
// import { getUser } from "./redux/user/user";
import { PrivateRoute } from "./components/helpers/privateRoute";
import { PublicRoute } from "./components/helpers/publicRoute";
import Payment from "./components/pages/payment";
import Terms from "./components/pages/terms";
import PageNotFound from "./components/pages/pageNotFound";
import Home from "./components/pages/home";
import MyClasses from "./components/pages/myClasses";

function App() {
  const { isAuthenticate } = useSelector((state) => state.auth);

  useEffect(() => {
    // Здесь вы можете выполнять любые действия по проверке токена или получению текущего пользователя из localStorage
  }, [isAuthenticate]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/check-email" element={<PublicRoute><CheckEmail /></PublicRoute>} />
        <Route path="/confirm-reset" element={<PublicRoute><ConfirmReset /></PublicRoute>} />
        <Route path="/payment" element={<PublicRoute><Payment /></PublicRoute>} />
        <Route path="/upload" element={<PrivateRoute><UploadImage /></PrivateRoute>} />
        <Route path="/setting" element={<PrivateRoute><Setting /></PrivateRoute>} />
        <Route path="/success" element={<PrivateRoute><Success /></PrivateRoute>} />
        <Route path="/my-classes" element={<PrivateRoute><MyClasses /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
