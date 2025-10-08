import React, { useState, useEffect } from 'react';
import { X, Save, User, Phone, MapPin, Globe, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface EditProfileProps {
  onClose: () => void;
  currentProfile: {
    full_name: string;
    phone_number: string;
    location: string;
  };
  onUpdate: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({ onClose, currentProfile, onUpdate }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const phoneNumberParts = currentProfile.phone_number ? currentProfile.phone_number.split(' ') : ['+1', ''];

  const [formData, setFormData] = useState({
    fullName: currentProfile.full_name || '',
    countryCode: phoneNumberParts[0] || '+1',
    phoneNumber: phoneNumberParts.slice(1).join(' ') || '',
    location: currentProfile.location || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const { error } = await supabase
      .from('user_profiles')
      .update({
        full_name: formData.fullName,
        phone_number: `${formData.countryCode} ${formData.phoneNumber}`,
        location: formData.location,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user?.id);

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setIsLoading(false);
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => {
        onUpdate();
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {message && (
            <div
              className={`p-4 rounded-xl flex items-start gap-3 ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border-2 border-green-200'
                  : 'bg-red-50 text-red-800 border-2 border-red-200'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <span className="text-sm font-medium">{message.text}</span>
            </div>
          )}

          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <User className="absolute left-4 top-[42px] transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 hover:border-gray-300 bg-white"
            />
          </div>

          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  required
                  className="w-full pl-9 pr-2 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 hover:border-gray-300 bg-white text-sm font-medium appearance-none"
                >
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+91">+91</option>
                  <option value="+86">+86</option>
                  <option value="+81">+81</option>
                  <option value="+49">+49</option>
                  <option value="+33">+33</option>
                  <option value="+61">+61</option>
                  <option value="+55">+55</option>
                  <option value="+7">+7</option>
                </select>
              </div>
              <div className="col-span-2 relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="tel"
                  placeholder="123-456-7890"
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9-]/g, '');
                    setFormData({ ...formData, phoneNumber: value });
                  }}
                  required
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 hover:border-gray-300 bg-white"
                />
              </div>
            </div>
          </div>

          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <MapPin className="absolute left-4 top-[42px] transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="City, Country"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 hover:border-gray-300 bg-white"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
