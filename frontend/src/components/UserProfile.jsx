
import React from "react";

const UserProfile = (props) => {
  const { firstName, lastName, email } = props.userDetails; 
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split(",") || [];
  console.log("adminEmails: ", adminEmails);
  
  const isAdmin = adminEmails.includes(email);

  return (
    <div className="p-6 bg-gray-100 rounded shadow-md max-w-md w-full">
  <h2 className="text-xl font-bold mb-4 text-gray-700">User Profile</h2>
  <div className="flex flex-col gap-3">
    <div>
      <span className="font-semibold text-gray-600">First Name:</span> {firstName}
    </div>
    <div>
      <span className="font-semibold text-gray-600">Last Name:</span> {lastName}
    </div>
    <div>
      <span className="font-semibold text-gray-600">Email:</span> {email}
    </div>
    <div>
      <span className="font-semibold text-gray-600">Admin Status:</span> {isAdmin ? "Admin" : "User"}
    </div>
  </div>
</div>

  );
};

export default UserProfile;
