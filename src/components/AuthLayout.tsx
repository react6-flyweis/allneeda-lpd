import React from 'react';
import BusinesswomanWithCoffee from "/src/assets/auth/images/Businesswomanwithcoffee.svg"
import businesswoman from "/src/assets/auth/images/businesswoman.svg"
interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title = 'Simplify management with our dashboard.',
  description = 'Simplify your e-commerce management with our user-friendly admin dashboard',
}) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white items-center gap-10 xl:gap-0">
      {/* Left Panel - Illustration */}
      <div className="h-full border-gray-900 lg:w-1/2 bg-(--dark-blue) xl:p-0 flex flex-col justify-center items-center text-white lg:rounded-3xl lg:m-8">
        <div className="max-w-md w-full mt-20 p-0 px-10">
          <h1 className="md:text-2xl lg:text-4xl font-bold mb-4 leading-tight">{title}</h1>
          <p className="text-base lg:text-lg mb-12 opacity-90">{description}</p>
          
          {/* Illustration Container - Side by Side */}
          <div className="relative bg-(--dark-blue)  w-full h-72 lg:h-80 flex items-end justify-center gap-4">
            <div className="flex-[1.5] flex justify-start">
              <img
                src={BusinesswomanWithCoffee}
                alt="Businesswoman in conversation"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex-1 flex justify-end">
              <img
                src={businesswoman}
                alt="Businesswoman"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Content */}
      <div className="h-full lg:w-1/2  xl:p-0 flex flex-col justify-center items-center text-white bg-white lg:m-8">
        <div className="w-full max-w-2xl rounded-2xl h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
