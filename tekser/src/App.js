import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "./components/pages/profile";
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
import MyClasses from "./components/pages/myClasses";
import { useLocation } from "react-router-dom";
const TrackPageView = () => {
  const location = useLocation();

  useEffect(() => {
    window.gtag('config', 'G-R503BVLTP8', {
      page_path: location.pathname,
    });
  }, [location]);

  return null;
};

function App() {
  const { isAuthenticate } = useSelector((state) => state.auth);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-R503BVLTP8`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-R503BVLTP8');
    };
    // Здесь вы можете выполнять любые действия по проверке токена или получению текущего пользователя из localStorage
  }, [isAuthenticate]);

  return (
    <Router>
      <TrackPageView />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/upload" element={<UploadImage />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/success" element={<PrivateRoute><Success /></PrivateRoute>} />
        <Route path="/my-classes" element={<PrivateRoute><MyClasses /></PrivateRoute>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </Router>
  );
}

export default App;
