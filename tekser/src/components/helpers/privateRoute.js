import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

export const PrivateRoute = ({ children }) => {
  const { isLoading, isAuthenticate } = useSelector((state) => state.auth);

  if (isLoading)
    return (
      <div className="flex flex-1 justify-center items-center h-screen">
        <MoonLoader
          size={150}
          color="#7F56D9"
          loading={true}
          cssOverride={{}}
          speedMultiplier={1}
        />
      </div>
    );

  return isAuthenticate ? children : <Navigate to="/login" replace />;
};
