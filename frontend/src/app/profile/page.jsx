'use client'

import GoogleSignIn from '@/components/GoogleSignIn'
import { useState , useEffect } from 'react'
import Cookies from 'js-cookie'

export default function LoginPage() {

  const [ isLoggedIn , setIsLoggedIn ] = useState(false)
  const [ user , setUser ] = useState(null)

  useEffect(() => {
    async function checkUserStatus(){
      try{
        const token = Cookies.get('access')
        console.log("token : ", token)
        if(!token){
          setIsLoggedIn(false)
        }else{  
          setIsLoggedIn(true)
          const UserCookie = Cookies.get('user')
          if(UserCookie){
            const userDetails = JSON.parse(UserCookie)
            setUser(userDetails)
            console.log("user : " , user)
          }
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

  return (
    <div className="flex items-center justify-center min-h-screen">
        {isLoggedIn ? (
          <div>
              <h2>Welcome, {user?.username || 'User'}!</h2>
              <button onClick={handleSignOut} className="px-4 py-2 mt-4 bg-red-500 text-white rounded">
                  Sign Out
              </button>
          </div>
        ) : (
          <div className="p-2 border rounded-lg shadow-lg">
            <GoogleSignIn/>
          </div>
        )}
      
    </div>
  );
}