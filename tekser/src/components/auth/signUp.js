import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LeftSide from "../../layout/authLeft";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState({});
  // ** Google login redirectUri
  // const redirectUri = window.location.origin + "/google-oauth";

  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    handleValidate();
    if (error.email === "" && error.password === "" && error.username === "" ) {
      const data = { email, password, username };
      try {
        // await dispatch(handleSignUp(data));
        navigate("/login");
      } catch (err) {
        console.error("SignUp error:", err);
        setError({ signUpError: "Failed to sign up. Please try again." });
      }
    }
  };

  // useEffect(() => {
  //   dispatch(getGoogleUrl(redirectUri));
  // }, [redirectUri, dispatch]);

  const handleValidate = () => {
    let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    let passwordValid = password.length >= 8;
    setError({
      email: email.length
        ? emailValid
          ? ""
          : "Email form is invalid"
        : "Email Field is required",
      password: password.length
        ? passwordValid
          ? ""
          : "Password must be at least 8 characters"
        : "Password Field is required",
      username: username.length ? "" : "Username Field is required"
    });
  };

  return (
    <div className="min-h-screen md:flex md:justify-center md:items-center font-poppinslight">
      <LeftSide />
      <div className="flex md:w-1/2 min-h-screen justify-center py-10 items-center bg-white">
        <form className="bg-white w-2/3 lg:w-1/2" onSubmit={onSubmit}>
          <h1 className="text-gray-800 font-poppinsSemiBold text-3xl mb-3">
            Create an account
          </h1>
          <p className="text-base font-normal text-gray-600 mb-8">
            Setting up an account is free
          </p>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block mb-1.5 text-sm font-poppinsMedium text-gray-900"
            >
              Username*
            </label>
            <input
              type="text"
              id="username"
              className={`border text-base rounded-lg focus:shadow-primary focus:border-primary-600 focus:ring-1 focus:ring-primary-600 focus:outline-none block w-full py-2.5 px-3.5 ${
                error.username
                  ? "text-red-500 border-red-500"
                  : "border-gray-300 text-gray-500"
              }`}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
            {error.username && (
              <div className="font-poppinsMedium mt-2 text-red-500">
                {error.username}
              </div>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-1.5 text-sm font-poppinsMedium text-gray-900"
            >
              Email*
            </label>
            <input
              type="text"
              id="email"
              className={`border text-base rounded-lg focus:shadow-primary focus:border-primary-600 focus:ring-1 focus:ring-primary-600 focus:outline-none block w-full py-2.5 px-3.5 ${
                error.email
                  ? "text-red-500 border-red-500"
                  : "border-gray-300 text-gray-500"
              }`}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && (
              <div className="font-poppinsMedium mt-2 text-red-500">
                {error.email}
              </div>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-1.5 text-sm font-poppinsMedium text-gray-900"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              className={`border mb-2 text-base rounded-lg focus:shadow-primary focus:border-primary-600 focus:ring-1 focus:ring-primary-600 focus:outline-none block w-full py-2.5 px-3.5 ${
                error.password
                  ? "text-red-500 border-red-500"
                  : "border-gray-300 text-gray-500"
              }`}
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && (
              <div className="font-poppinsMedium mb-2 text-red-500">
                {error.password}
              </div>
            )}
            <span className="text-sm">Must be at least 8 characters.</span>
          </div>
       
          {error.signUpError && (
            <div className="font-poppinsMedium mb-2 text-red-500">
              {error.signUpError}
            </div>
          )}
          <button
            type="submit"
            className="block w-full bg-primary-600 hover:bg-primary-700 mt-6 py-2 rounded-lg text-white font-poppinsSemiBold mb-2"
          >
            Sign up
          </button>
          <a
            href={store.googleUrl}
            target="_self"
            rel="noopener noreferrer"
            className="flex justify-center w-full mt-4 py-2 rounded-lg font-poppinsSemiBold mb-2 border border-gray-300"
          >
            <span className="inline-block align-middle mr-3">
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 18 18"
              >
                <path
                  d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z"
                  fill="#34A853"
                ></path>
                <path
                  d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z"
                  fill="#EA4335"
                ></path>
              </svg>
            </span>
            <span className="text-base">Sign up with Google</span>
          </a>
          <div className="mb-8 text-center text-sm text-gray-600">
            By creating a account I acknowledge that I have read and fully
            understand the{" "}
            <Link
              to="/privacy"
              className="text-gray-900 hover:text-primary-700 cursor-pointer font-poppinsSemiBold"
            >
              Privacy
            </Link>{" "}
            &{" "}
            <Link
              to="/terms"
              className="text-gray-900 hover:text-primary-700 cursor-pointer font-poppinsSemiBold"
            >
              Terms
            </Link>{" "}
            of use.
          </div>
          <div className="text-center">
            <span className="text-sm font-poppinsRegular justify-center">
              Already have an account ?{" "}
              <Link
                to="/login"
                className="hover:text-primary-700 cursor-pointer font-poppinsSemiBold"
              >
                Log in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
