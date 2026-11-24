
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/AuthForm';
import { authReturnPath } from '@/lib/authReturnPath';

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = authReturnPath(searchParams.get('redirect'));

  useEffect(() => {
    if (user && !loading) {
      navigate(returnTo, { replace: true });
    }
  }, [user, loading, navigate, returnTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <AuthForm />;
};

export default Auth;
