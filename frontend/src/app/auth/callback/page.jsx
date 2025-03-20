//frontend\src\app\auth\callback\page.jsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");

      if (code) {
        try {
          const response = await fetch(
            `${BACKEND_URL}/api/auth/google/callback/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ code }),
              credentials: "include",
            }
          );

          const data = await response.json();
          console.log("Data : ", data);

          if (response.ok) {
            // const result = await response.json();

            Cookies.set("access", data.access);
            Cookies.set("refresh", data.refresh);
            const userDetails = jwtDecode(data.access);

            // console.log("decoded token : ", userDetails);
            // console.log("email : ",userDetails.email);

            Cookies.set(
              "user",
              JSON.stringify({
                id: userDetails.user_id,
                firstName: userDetails.first_name,
                lastName: userDetails.last_name,
                email: userDetails.email,
              })
            );

            router.push("/");
          } else {
            throw new Error(data.error || "Authentication failed");
          }
        } catch (error) {
          console.error("Authentication error:", error);
          router.push(`/login?error=${encodeURIComponent(error.message)}`);
        }
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Authenticating...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
}
