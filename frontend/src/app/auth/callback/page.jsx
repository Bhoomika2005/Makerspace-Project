'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      console.log("Received code from Google:", code);

      if (code) {
        try {
          const response = await fetch(`${BACKEND_URL}/api/auth/google/callback/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code }),
            credentials: 'include',
          });

          const responseText = await response.text();
          console.log("Raw backend response:", responseText);

          let data;
          try {
            data = JSON.parse(responseText);
          } catch (e) {
            console.error("Failed to parse JSON response:", responseText);
            throw new Error("Invalid server response format");
          }

          if (response.ok) {
            console.log("Authentication successful:", data);
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            router.push('/');
          } else {
            throw new Error(data.error || 'Authentication failed');
          }
        } catch (error) {
          console.error('Authentication error:', error);
          router.push(`/login?error=${encodeURIComponent(error.message)}`);
        }
      } else {
        router.push('/login?error=no_code');
      }
    };

    handleCallback();
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Authenticating...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
}