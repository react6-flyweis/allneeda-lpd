import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    phone: '',
    agreeToTerms: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 33;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 33;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 34;
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup submitted:', formData);
  };

  const getStrengthColor = () => {
    if (passwordStrength < 33) return 'bg-red-500';
    if (passwordStrength < 66) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-2xl lg:text-3xl font-medium text-gray-800 mb-2">Sign up</h2>
        <p className="text-(--dark-text-gray) text-sm mb-6">Please Signup to your account</p>

        <form onSubmit={handleSubmit}>
          <Input
            // label="Full Name"
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />

          <Input
            // label="Email Address"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <div className="mb-4">
            <Input
              // label="New Password"
              type="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handlePasswordChange}
              required
            />
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1 h-1">
                  <div className={`flex-1 rounded ${passwordStrength >= 33 ? getStrengthColor() : 'bg-gray-200'}`}></div>
                  <div className={`flex-1 rounded ${passwordStrength >= 66 ? getStrengthColor() : 'bg-gray-200'}`}></div>
                  <div className={`flex-1 rounded ${passwordStrength === 100 ? getStrengthColor() : 'bg-gray-200'}`}></div>
                </div>
              </div>
            )}
          </div>

          <Input
            // label="Confirm New Password"
            type="password"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />

          <div className="mb-4">
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">
              Role<span className="text-red-500">*</span>
            </label> */}
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--dark-blue) focus:border-transparent transition-all"
            >
              <option value="">Role</option>
              <option value="CEO">CEO</option>
              <option value="CFO">CFO</option>
              <option value="CXO">CXO</option>
              <option value="HR">HR</option>
              <option value="SEO">SEO</option>
              <option value="B2B">B2B</option>
            </select>
          </div>

          <Input
            // label="Phone number(optional)"
            type="tel"
            placeholder="Phone number(optional)"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <div className="mb-6">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                required
                className="w-4 h-4 mt-1 text-(--dark-blue) border-gray-300 rounded focus:ring-(--dark-blue)"
              />
              <span className="ml-2 text-sm text-gray-700">
                I agree to <span className="text-(--dark-blue) font-medium">Terms & Privacy Policy</span>
              </span>
            </label>
          </div>

          <Button type="submit" fullWidth className="mb-4">
            Signup
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-(--dark-blue) font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
