import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LeftSide from '../../layout/authLeft';
import { useTranslation } from 'react-i18next';
import { LocalImg } from '../basic/imgProvider';

const Login = () => {
  const { t } = useTranslation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://aisun-production.up.railway.app/api/v1/login', { kundelikLogin: login, kundelikPassword: password });
      const { user, token } = response.data;

      // Store the token and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');
    } catch (err) {
      setError('Login or password is incorrect');
    }
  };

  return (
    <div className="min-h-screen md:flex md:justify-center md:items-center font-poppinslight">
      <LeftSide />
      <div className="flex md:w-1/2 min-h-screen justify-center py-10 items-center bg-white">
        <form className="bg-white w-2/3 lg:w-1/2" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-poppinsSemiBold text-3xl mb-3 inline-flex items-center">
            {t('Log in with')}
            <img src={LocalImg.KundelikKz} className="ml-2 w-40 h-24" alt="Kundelik.kz" />
          </h1>
          <p className="text-base font-normal text-gray-600 mb-8">
            {t('Welcome! Please enter your details.')}
          </p>
          <div className="mb-6">
            <label htmlFor="login" className="block mb-1.5 text-sm font-poppinsMedium text-gray-900">
              {t('Login')}
            </label>
            <input
              type="text"
              id="login"
              className={`border text-base rounded-lg focus:shadow-primary focus:border-primary-600 focus:ring-1 focus:ring-primary-600 focus:outline-none block w-full py-2.5 px-3.5 ${
                error ? 'text-red-500 border-red-500' : 'border-gray-300 text-gray-500'
              }`}
              placeholder={t('Enter your login')}
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-1.5 text-sm font-poppinsMedium text-gray-900">
              {t('Password')}
            </label>
            <input
              type="password"
              id="password"
              className={`border text-base rounded-lg focus:shadow-primary focus:border-primary-600 focus:ring-1 focus:ring-primary-600 focus:outline-none block w-full py-2.5 px-3.5 ${
                error ? 'text-red-500 border-red-500' : 'border-gray-300 text-gray-500'
              }`}
              placeholder="•••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="font-poppinsMedium mt-2 text-red-500">{error}</div>}
          </div>
          <button
            type="submit"
            className="block w-full bg-primary-600 hover:bg-primary-700 mt-6 py-2 rounded-lg text-white font-poppinsSemiBold mb-2"
          >
            {t('Sign in')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
