import React, { useState } from 'react';
import { Chrome, AlertCircle, CheckCircle, Sparkles, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AuthPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { signInWithProvider } = useAuth();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setMessage(null);

    const { error } = await signInWithProvider('google');

    if (error) {
      setMessage({
        type: 'error',
        text: 'Unable to sign in with Google. Please try again.'
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-4 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Welcome
              </h1>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Sign in to access your account
              </p>
            </div>

            {message && (
              <div
                className={`mb-6 p-4 rounded-xl animate-slide-down flex items-start gap-3 ${
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

            <div className="space-y-4">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:border-blue-400 hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-700">Signing in...</span>
                  </>
                ) : (
                  <>
                    <Chrome className="w-6 h-6 text-red-500" />
                    <span className="text-gray-700">Continue with Google</span>
                  </>
                )}
              </button>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Secure Authentication</h3>
                    <p className="text-sm text-blue-700">
                      Sign in securely using your Google account. Your data is protected with industry-standard encryption.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-white/75 text-sm mt-6 flex items-center justify-center gap-2">
          <Shield className="w-4 h-4" />
          Secure authentication powered by Supabase
        </p>
      </div>
    </div>
  );
};
