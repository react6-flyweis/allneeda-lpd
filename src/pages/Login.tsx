import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import RoleSelector from '../components/RoleSelector';
import OTPModal from '../components/OTPModal';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    navigate('/dashboard');
    e.preventDefault();
    // console.log('Login submitted:', formData);
  };

  const handleOTPSubmit = (code: string) => {
    setIsOTPModalOpen(false);
    navigate('/forgot-password');
    console.log('OTP submitted:', code);
  };

  return (
    <AuthLayout>
      <div className="h-full">
        <div className="mb-6 flex flex-col items-center">
        <h2 className="md:text-2xl lg:text-5xl font-medium text-(--dark-text-black) mb-2 text-center">Welcome Back</h2>
        <p className="text-(--dark-text-gray) text-md mb-8 font-regular text-center">Please login to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <RoleSelector />

          <Input
            // label="Email Address"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            // required
          />

          <Input
            // label="Password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            // required
          />

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="w-4 h-4 text-(--dark-blue) border-gray-300 rounded focus:ring-(--dark-blue)"
              />
              <span className="ml-2 text-sm text-(--dark-text-gray)">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => setIsOTPModalOpen(true)}
              className="text-sm text-(--dark-text-gray) hover:underline"
            >
              Forget Password?
            </button>
          </div>

          <Button type="submit" fullWidth className="mb-6 bg-(--dark-blue)">
            Login
          </Button>

          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div> */}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-2 py-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
            >
              <FcGoogle size={20} />
              <span className="font-medium text-gray-700 text-sm">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-2 py-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
            >
              <FaFacebook size={20} className="text-blue-600" />
              <span className="font-medium text-gray-700 text-sm">Facebook</span>
            </button>
          </div>

          <p className="text-center text-sm text-(--dark-text-gray-2)">
            Need an account?{' '}
            <Link to="/signup" className="text-(--dark-red) font-normal hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>

      {/* OTP Modal */}
      <OTPModal
        isOpen={isOTPModalOpen}
        onClose={() => setIsOTPModalOpen(false)}
        onSubmit={handleOTPSubmit}
      />
    </AuthLayout>
  );
};

export default Login;
