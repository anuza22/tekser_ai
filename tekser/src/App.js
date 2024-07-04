import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckEmail from "./components/auth/checkEmail";
import ConfirmReset from "./components/auth/confirmReset";
import ForgotPassword from "./components/auth/forgotPassword";
import Login from "./components/auth/login";
import ResetPassword from "./components/auth/ResetPassword";
import SignUp from "./components/auth/signUp";
import UploadImage from "./components/pages/uploadImage";
import Setting from "./components/pages/setting";
import Success from "./components/pages/success";
import Contact from "./components/pages/contact";
import Landing from "./components/pages/landing";
import Privacy from "./components/pages/privacy";
import { getUser } from "./redux/user/user";
import { PrivateRoute } from "./components/helpers/privateRoute";
import { PublicRoute } from "./components/helpers/publicRoute";
import  Payment from "./components/pages/payment";
import Terms from "./components/pages/terms";
import PageNotFound from "./components/pages/pageNotFound";
import Home from "./components/pages/home";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/google-oauth" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
          <Route path="/check-email" element={<PublicRoute><CheckEmail /></PublicRoute>} />
          <Route path="/reset-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />
          <Route path="/confirm-reset" element={<PublicRoute><ConfirmReset /></PublicRoute>} />
          <Route path="/payment" element={<PublicRoute><Payment /></PublicRoute>} />
          <Route path="/upload" element={<PublicRoute><UploadImage /></PublicRoute>} />
          <Route path="/setting" element={<PublicRoute><Setting /></PublicRoute>} />
          <Route path="/success" element={<PublicRoute><Success /></PublicRoute>} />
        </Routes>
    </Router>
  );
}

export default App;
