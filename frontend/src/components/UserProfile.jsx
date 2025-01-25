
import React from "react";

const UserProfile = (props) => {
  const { firstName, lastName, email } = props.userDetails; 
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split(",") || [];
  console.log("adminEmails: ", adminEmails);
  
  const isAdmin = adminEmails.includes(email);

  return (
    <div
  className="p-6 bg-gray-100 rounded shadow-md max-w-md w-full"
  style={{
    boxShadow: 'inset 0 4px 10px rgba(0, 0, 0, 0.7)', // Inset shadow for outer div
  }}
>
  <div className="flex flex-col gap-3 rounded-md">
    <div>
      <span className="font-semibold text-[#0610ab]">First Name:</span> {firstName}
    </div>
    <div>
      <span className="font-semibold text-[#0610ab]">Last Name:</span> {lastName}
    </div>
    <div>
      <span className="font-semibold text-[#0610ab]">Email:</span> {email}
    </div>
    <div>
      <span className="font-semibold text-[#0610ab]">Status:</span> {isAdmin ? "Admin" : "User"}
    </div>
  </div>
</div>

  );
};

export default UserProfile;
