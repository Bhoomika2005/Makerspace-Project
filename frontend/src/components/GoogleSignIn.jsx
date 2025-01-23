'use client';

import { FcGoogle } from 'react-icons/fc'; 

export default function GoogleSignIn() {
  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = encodeURIComponent('http://localhost:3000/auth/callback');
    const scope = encodeURIComponent('email profile openid');
    const responseType = 'code';
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + 
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `response_type=${responseType}&` +
      `scope=${scope}&` +
      `access_type=offline&` +
      `prompt=consent`;
    
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 w-full"
    >
      <FcGoogle className="text-xl" /> 
      Sign in with Google
    </button>
  );
}
