import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Change password submitted:', formData);
  };

  const handleDiscard = () => {
    navigate("/login");
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  // Password requirements validation
  const hasUppercase = /[A-Z]/.test(formData.newPassword);
  const hasNumber = /[0-9]/.test(formData.newPassword);
  const hasMinLength = formData.newPassword.length >= 8;

  return (
    <AuthLayout
      title="Simplify management with our dashboard."
      description="Simplify your e-commerce management with our user-friendly admin dashboard"
    >
      <div className="h-full">
        <div className="mb-6 flex flex-col items-start">
          <h2 className="md:text-2xl lg:text-3xl font-medium text-(--dark-text-black) mb-2">
            Change Password
          </h2>
          <p className="text-(--dark-text-gray) text-sm mb-8 font-regular">
            Update password for enhanced account security
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            placeholder="Current Password*"
            value={formData.currentPassword}
            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
            required
          />

          <Input
            type="password"
            placeholder="New Password*"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            required
          />

          <Input
            type="password"
            placeholder="Confirm New Password*"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            className="mb-6"
          />

          {/* Password Requirements */}
          <div className="mb-6">
            <p className="text-sm text-(--dark-text-gray) mb-3">Weak Password. Must Contain:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                  hasUppercase ? 'bg-(--dark-blue) border-(--dark-blue)' : 'border-gray-300'
                }`}>
                  {hasUppercase && <Check size={12} className="text-white" />}
                </div>
                <span className="text-sm text-(--dark-text-gray)">At least 1 uppercase</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                  hasNumber ? 'bg-(--dark-blue) border-(--dark-blue)' : 'border-gray-300'
                }`}>
                  {hasNumber && <Check size={12} className="text-white" />}
                </div>
                <span className="text-sm text-(--dark-text-gray)">At least 1 number</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                  hasMinLength ? 'bg-(--dark-blue) border-(--dark-blue)' : 'border-gray-300'
                }`}>
                  {hasMinLength && <Check size={12} className="text-white" />}
                </div>
                <span className="text-sm text-(--dark-text-gray)">At least 8 characters</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button type="button" variant="outline" fullWidth onClick={handleDiscard}>
              Discard
            </Button>
            <Button type="submit" fullWidth>
              Apply Changes
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
