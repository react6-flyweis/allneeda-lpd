import React, { useState, useEffect } from 'react';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import { AiOutlineCheck } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
const navigate = useNavigate();
  const [requirements, setRequirements] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  useEffect(() => {
    const password = formData.newPassword;
    setRequirements({
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    });
  }, [formData.newPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Password change submitted:', formData);
    // Handle password change logic here
  };

  const handleDiscard = () => {
    console.log("Discard");
    navigate("/login");
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <AuthLayout
      title="Simplify management with our dashboard."
      description="Update your password to enhance account security"
    >
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Change Password</h2>
        <p className="text-gray-500 text-sm mb-6">Update password for enhanced account security</p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Current Password"
            type="password"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
            required
          />

          <Input
            label="New Password"
            type="password"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />

          {formData.newPassword && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-3">Password Requirements:</p>
              <div className="space-y-2">
                <RequirementItem met={requirements.minLength} text="At least 8 characters" />
                <RequirementItem met={requirements.hasUpperCase} text="At least 1 uppercase letter" />
                <RequirementItem met={requirements.hasLowerCase} text="At least 1 lowercase letter" />
                <RequirementItem met={requirements.hasNumber} text="At least 1 number" />
                <RequirementItem met={requirements.hasSpecialChar} text="At least 1 special character" />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Button type="button" variant="outline" onClick={handleDiscard}>
              Discard
            </Button>
            <Button type="submit">Apply Changes</Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

const RequirementItem: React.FC<{ met: boolean; text: string }> = ({ met, text }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-5 h-5 rounded-full flex items-center justify-center ${
        met ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      {met && <AiOutlineCheck className="text-white" size={14} />}
    </div>
    <span className={`text-sm ${met ? 'text-green-700' : 'text-gray-600'}`}>{text}</span>
  </div>
);

export default ChangePassword;
