'use client'

import GoogleSignIn from '@/components/GoogleSignIn'
import UserProfile from '@/components/UserProfile'
import { useState , useEffect } from 'react'
import Cookies from 'js-cookie'
import LoginComponent from '@/components/LoginComponent'

export default function LoginPage() {

  const [ isLoggedIn , setIsLoggedIn ] = useState(false)
  const [ user , setUser ] = useState(null)
  const [ userDetails , setuserDetails ] = useState(null)

  useEffect(() => {
    async function checkUserStatus(){
      try{
        const token = Cookies.get('access')
        console.log("token : ", token)

        if(!token){
          setIsLoggedIn(false)
          return
        }

        const userCookie = Cookies.get('user')
        if(userCookie){
          const userDetails = JSON.parse(userCookie)
          console.log("user : ",userDetails)
          setuserDetails(userDetails)
          setIsLoggedIn(true)
          setUser(userDetails)
        }

      }catch(error){
        console.error("Error checking the user status : ", error)
        setIsLoggedIn(false)
      }
    }
    checkUserStatus();
  },[]);

  const handleSignOut = () => {
    Cookies.remove('access');
    Cookies.remove('refresh');
    Cookies.remove('user');

    // router.refresh()

    setIsLoggedIn(false);
    setUser(null);

    // router.push('/');
    window.location.href = '/'
}

  // return (
  //   <div className="flex items-center justify-center min-h-screen bg-gray-50">
  // {isLoggedIn ? (
  //   <div className="text-center bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
  //     <h2 className="text-2xl font-semibold mb-4 text-gray-700">
  //       Welcome, {user?.firstName || "User"}!
  //     </h2>
  //     <UserProfile userDetails={userDetails} />
  //     <button
  //       onClick={handleSignOut}
  //       className="px-6 py-3 mt-6 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg shadow-md transition duration-300"
  //     >
  //       Sign Out
  //     </button>
  //   </div>
  // ) : (
  //         <div className="p-2 border rounded-lg shadow-lg">
  //           <LoginComponent/>
  //           <GoogleSignIn/>
  //         </div>
  //       )}
      
  //   </div>
  // );
  // return (
  //   <div
  //     className="flex items-center justify-center min-h-screen bg-cover bg-center"
  //     style={{
  //       backgroundImage: "url('/images/img.jpg')",
  //     }}
  //   >
  //     <div
  //       className="p-6 rounded-lg shadow-lg max-w-sm w-full"
  //       style={{
  //         background: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
  //         backdropFilter: 'blur(15px)', // Frosted glass effect
  //         WebkitBackdropFilter: 'blur(10px)', // For Safari
  //         border: '1px solid rgba(255, 255, 255, 0.3)', // Subtle border
  //         boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Soft shadow
  //       }}
  //     >
  //       {isLoggedIn ? (
  //         <div className="text-center">
  //           <h2 className="text-2xl font-semibold mb-4 text-gray-700">
  //             Welcome, {user?.firstName || 'User'}!
  //           </h2>
  //           <UserProfile userDetails={userDetails} />
  //           <button
  //             onClick={handleSignOut}
  //             className="px-6 py-3 mt-6 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg shadow-md transition duration-300"
  //           >
  //             Sign Out
  //           </button>
  //         </div>
  //       ) : (
  //         <LoginComponent />
  //       )}
  //     </div>
  //   </div>
  // );
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/img.jpg')",
      }}
    >
      <div
        className="p-6 rounded-lg shadow-lg max-w-sm w-full"
        style={{
          background: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
          backdropFilter: 'blur(8px)', // Decreased blur effect
          WebkitBackdropFilter: 'blur(8px)', // For Safari
          border: '1px solid rgba(255, 255, 255, 0.3)', // Subtle border
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Soft shadow
        }}
      >
        {isLoggedIn ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Welcome, {user?.firstName || 'User'}!
            </h2>
            <UserProfile userDetails={userDetails} />
            <button
              onClick={handleSignOut}
              className="px-6 py-3 mt-6 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg shadow-md transition duration-300"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <LoginComponent />
        )}
      </div>
    </div>
  );
  
}