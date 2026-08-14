import { useEffect } from 'react';
import { handleCallback } from '../auth/authService';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const processCallback = async () => {
      try {
        await handleCallback();
        navigate('/admin/admin'); // Redirect to home or another page after successful login
      } catch (error) {
        console.error('Error handling callback:', error);
        navigate('/error'); // Redirect to an error page if needed
      }
    };
    processCallback();
  }, [navigate]);

  return <div>Processing login callback...</div>;
}

export default Callback;