import React, { useState } from 'react';
import styled from 'styled-components';

const Facultynewcard = ({ name, role, image, email, location, onEdit, onDelete,isAdmin }) => {
  const [copyMessage, setCopyMessage] = useState('');
  const [hoverEmailMessage, setHoverEmailMessage] = useState('');

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(email); // Copies the email to clipboard
      setCopyMessage('Email copied!'); // Show notification that the email has been copied
      setTimeout(() => setCopyMessage(''), 5000); // Clear message after 2 seconds
    } catch (error) {
      console.error('Failed to copy email: ', error);
      setCopyMessage('Failed to copy'); // In case copying fails
      setTimeout(() => setCopyMessage(''), 5000); // Clear message after 2 seconds
    }
  };

  const handleMailHover = () => {
    setHoverEmailMessage(email); // Show the email when the mail icon is hovered
    setTimeout(() => setHoverEmailMessage(''), 5000); // Hide the email after 5 seconds
  };
  return (
    <StyledWrapper>
      <div className="card">
        {/* Mail icon and email box container */}
        {/* <div className="mail-container"  onClick={handleEmailClick}
         onMouseEnter={handleMailHover}
         onMouseLeave={() => setHoverEmailMessage('')}>
          <button className="mail">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
          </button>

         
          <div className="email-box" onClick={handleEmailClick}>
            <span>{email}</span>
          </div>
        </div> */}
     <div className="actions-row">
  {isAdmin && (
    <>
      <div className="edit-action">
        <button className="action-btn" onClick={onEdit}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
            <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
          </svg>
        </button>
        <div className="edit-box">
          <span>Edit</span>
        </div>
      </div>
      <div className="delete-action">
        <button className="action-btn delete" onClick={onDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 30 30">
            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
          </svg>
        </button>
        <div className="deletebox">
          <span>Delete</span>
        </div>
      </div>
    </>
  )}

  <div className="email-action" onClick={handleEmailClick}>
    <button className="action-btn" onClick={handleEmailClick}>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
<path d="M 10.5 8 C 6.9280619 8 4 10.928062 4 14.5 L 4 33.5 C 4 37.071938 6.9280619 40 10.5 40 L 37.5 40 C 41.071938 40 44 37.071938 44 33.5 L 44 14.5 C 44 10.928062 41.071938 8 37.5 8 L 10.5 8 z M 10.5 11 L 37.5 11 C 39.450062 11 41 12.549938 41 14.5 L 41 15.605469 L 24 24.794922 L 7 15.605469 L 7 14.5 C 7 12.549938 8.5499381 11 10.5 11 z M 7 19.015625 L 23.287109 27.820312 A 1.50015 1.50015 0 0 0 24.712891 27.820312 L 41 19.015625 L 41 33.5 C 41 35.450062 39.450062 37 37.5 37 L 10.5 37 C 8.5499381 37 7 35.450062 7 33.5 L 7 19.015625 z"></path>
</svg>
    </button>
    <div className="email-box">
      <span>{email}</span>
    </div>
  </div>
</div>


        {copyMessage && (
          <div className="copy-notification">
            {copyMessage}
          </div>
        )}

        {/* Profile Image */}
        <div className="profile-pic">
          <img
            src={image ? `http://localhost:8000${image}` : '/placeholder.svg?height=300&width=500'}
            alt="profile-pic"
          />
        </div>

        {/* Card Bottom Section */}
        <div className="bottom">
          <div className="content">
            <span className="role about-me"> 💼 {role}</span>
            <br />
            <span className="about-me">📍 {location}</span>
          </div>
          <div className="bottom-bottom ">
            <div className="name">{name}</div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 300px;
    height: 300px;
    background: white;
    border-radius: 32px;
    padding: 3px;
    position: relative;
    box-shadow: #604b4a30 0px 70px 30px -50px;
    transition: all 0.5s ease-in-out;
    
   
  }

  .card .mail {
    position: absolute;
    right: 2rem;
    top: 1.4rem;
    background: transparent;
    border: none;
  }

  .card .mail svg {
    stroke: #0610ab;
    stroke-width: 3px;
  }

  .card .mail svg:hover {
    stroke: #0610ab;
  }

  .card .profile-pic {
    position: absolute;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    top: 3px;
    left: 3px;
    border-radius: 29px;
    z-index: 1;
    border: 2px solid #0610ab;
    overflow: hidden;
    transition: all 0.5s ease-in-out 0.2s, z-index 0.5s ease-in-out 0.2s;
   
  }

  .card .profile-pic img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    object-position: 0px 0px;
    transition: all 0.5s ease-in-out 0s;
  }

  .card .bottom {
    position: absolute;
    bottom: 3px;
    left: 3px;
    right: 3px;
    background: linear-gradient(135deg, #027cc4, #0610ab);
    top: 80%;
    border-radius: 29px;
    z-index: 2;
    box-shadow: rgba(96, 75, 74, 0.1882352941) 0px 5px 5px 0px inset;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  }

  .card .bottom .content {
    position: absolute;
    bottom: 0;
    left: 1.5rem;
    right: 1.5rem;
    height: 160px;
  }

.card .bottom .bottom-bottom .name {
    width: 100%;
  display: block;
  font-size: 20px; /* Increased font size */
  color: white; /* Make the text white */
  text-align: center; /* Center-align text */
  margin-top: 1rem; /* Add spacing at the top for better placement */
  margin-bottom: 2rem; /* Add spacing at the top for better placement */
  position: absolute;
   /* Position the name vertically */
  
   /* Position the name horizontally */
  /* Perfectly center it both horizontally and vertically */
}

 .card .bottom .content .about-me {
  visibility: hidden; /* Initially hide it */
  opacity: 0; /* Make it invisible */
  font-size: 1.1rem;
  color: white;
  margin-top: 1rem;
  transition: opacity 0.3s ease, visibility 0s linear 0.3s; /* Smooth transition */
}

.card:hover .bottom .content .about-me {
  visibility: visible; /* Make it visible */
  opacity: 1; /* Fade in */
  transition: opacity 0.3s ease; /* Transition opacity */
}


  .card .bottom .bottom-bottom {
    position: absolute;
    bottom: 1rem;
    left: 1.5rem;
    right: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align:center;
    font-size: 19px;
  }
    

  .card .bottom .bottom-bottom .social-links-container {
    display: flex;
    gap: 1rem;
  }

  .card .bottom .bottom-bottom .social-links-container svg {
    height: 20px;
    fill: white;
    filter: drop-shadow(0 5px 5px rgba(165, 132, 130, 0.1333333333));
  }

  .card .bottom .bottom-bottom .social-links-container svg:hover {
    fill: #f55d56;
    transform: scale(1.2);
  }

  .card .bottom .bottom-bottom .button {
    background: white;
    color: #026bc0
    border: none;
    border-radius: 20px;
    font-size: 0.6rem;
    padding: 0.4rem 0.6rem;
    box-shadow: rgba(165, 132, 130, 0.1333333333) 0px 5px 5px 0px;
  }

  .card .bottom .bottom-bottom .button:hover {
      background: #026bc0;
    color: white;
  }

  .card:hover {
    border-top-left-radius: 55px;
  }

  .card:hover .bottom {
    top: 30%;
    border-radius: 80px 29px 29px 29px;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
  }

  .card:hover .profile-pic {
    width: 100px;
    height: 100px;
    aspect-ratio: 1;
    top: 10px;
    left: 10px;
    border-radius: 50%;
    z-index: 3;
    border: 7px solid #026bc0;
    box-shadow: rgba(96, 75, 74, 0.1882352941) 0px 5px 5px 0px;
    transition: all 0.5s ease-in-out, z-index 0.5s ease-in-out 0.1s;
  }

  .card:hover .profile-pic:hover {
    transform: scale(1.3);
    border-radius: 0px;
  }

  .card:hover .profile-pic img {
    transform: scale(1);
    object-position: 0px 0px;
    transition: all 0.5s ease-in-out 0.5s;
  }

  .card:hover .profile-pic svg {
    transform: scale(2.5);
    transition: all 0.5s ease-in-out 0.5s;
  }

  /* Make the email box visible only when hovered */
  .card .mail-container:hover .email-box {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s ease, visibility 0s;
    border: 2px solid #026bc0;
  }
  .card .mail-container:hover .edit{
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s ease, visibility 0s;
    border: 2px solid #026bc0;
  }
  .card .mail-container:hover .deletebox{
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s ease, visibility 0s;
    border: 2px solid #026bc0;
  }

  .card .email-box {
    position: absolute;
    top: -1.5rem; /* Position it outside of the card */
    right: -2rem; /* Shift it outside to the right */
    background-color: rgb(56, 53, 53);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    box-shadow: rgba(96, 75, 74, 0.1882352941) 0px 5px 5px 0px;
    font-size: 1rem;
    color: white;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.3s ease;
  }
  .card .edit-box {
    position: absolute;
    top: -1.5rem; /* Position it outside of the card */
    right: -2rem; /* Shift it outside to the right */
    background-color: rgb(56, 53, 53);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    box-shadow: rgba(96, 75, 74, 0.1882352941) 0px 5px 5px 0px;
    font-size: 1rem;
    color: white;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.3s ease;
  }
  .card .deletebox {
    position: absolute;
    top: -1.5rem; /* Position it outside of the card */
    right: -3rem; /* Shift it outside to the right */
    background-color: rgb(56, 53, 53);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    box-shadow: rgba(96, 75, 74, 0.1882352941) 0px 5px 5px 0px;
    font-size: 1rem;
    color: white;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.3s ease;
  }

  .card .email-box span {
    word-wrap: break-word;
   
  }
      .copy-notification {
    position: fixed;
    right: 20px;
    bottom: 20px;
    background-color: #4caf50;
    color: white;
    padding: 1rem;
    border-radius: 8px;
    font-size: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    opacity: 0.9;
    transition: opacity 0.5s ease;
  }
    .hover-email-box {
    position: fixed;
    right: 20px;
    top: 20px;
    background-color: rgb(56, 53, 53);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    color: white;
    font-size: 1rem;
    box-shadow: rgba(96, 75, 74, 0.1882352941) 0px 5px 5px 0px;
    transition: opacity 0.5s ease-in-out;
  }
     .actions-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    padding: 0.3rem 1rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .action-btn {
    background: white;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.3rem 0.6rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.3s;
  }

  .action-btn:hover {
    background: #034a8f;
  }

  .action-btn.delete {
    background: white;
  }

  .action-btn.delete:hover {
    background: #c5303c;
  }


.card  .email-box {
  position: absolute;
  top: -1rem; /* Adjust the distance above the button */
  right:-8rem; /* Adjust the distance to the right of the button */
  background-color: #026bc0;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: rgba(96, 75, 74, 0.1882352941) 0px 5px 5px 0px;
  font-size: 1rem;
  color: white;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.3s ease;
}


 .card .edit-box {
  position: absolute;
  top: -1rem; /* Adjust the distance above the button */
  right: 5rem; /* Adjust the distance to the right of the button */
  background-color: #026bc0;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: rgba(96, 75, 74, 0.1882352941) 0px 5px 5px 0px;
  font-size: 1rem;
  color: white;
  visibility: hidden; /* Start hidden */
  opacity: 0; /* Start fully transparent */
  transition: opacity 0.3s ease, visibility 0s linear 0.3s; /* Delay visibility change */
}

.card .mail-container:hover .deletebox {
  visibility: visible; /* Make visible when hovering */
  opacity: 1; /* Fade in */
  transition: opacity 0.3s ease, visibility 0s linear 0s; /* Instant visibility change */
}
 .card .deletebox {
  position: absolute;
  top: -1rem; /* Adjust the distance above the button */
  right: 1rem; /* Adjust the distance to the right of the button */
  background-color: rgb(203, 87, 87);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: rgba(96, 75, 74, 0.1882352941) 0px 5px 5px 0px;
  font-size: 1rem;
  color: white;
  visibility: hidden; /* Start hidden */
  opacity: 0; /* Start fully transparent */
  transition: opacity 0.3s ease, visibility 0s linear 0.3s; /* Delay visibility change */
}

.card .mail-container:hover .deletebox {
  visibility: visible; /* Make visible when hovering */
  opacity: 1; /* Fade in */
  transition: opacity 0.3s ease, visibility 0s linear 0s; /* Instant visibility change */
}


/* Ensure these elements appear when hovering over respective buttons */
.card .edit-action:hover .edit-box,
.card .delete-action:hover .deletebox,
.card .email-action:hover .email-box {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.3s ease, visibility 0s;
}

`;

export default Facultynewcard;
