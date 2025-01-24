import React from 'react';
import styled from 'styled-components';

const Facultynewcard = ({ name, role, image, email, location }) => {
  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;  // Opens the default email client with the email address
  };
  return (
    <StyledWrapper>
      <div className="card">
        {/* Mail icon and email box container */}
        <div className="mail-container">
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

          {/* Email Box */}
          <div className="email-box" onClick={handleEmailClick}>
            <span>{email}</span>
          </div>
        </div>

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
            <span className="role">{role}</span>
            <span className="name">{name}</span>
            <span className="about-me">{location}</span>
          </div>
          <div className="bottom-bottom">
            <span className="name">{name}</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 300px;
    height: 350px;
    background: white;
    border-radius: 16px; /* Rounded corners for the card */
    padding: 3px;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 30px -10px; /* Lighter, softer shadow */
    border: 2px solid #dcdcdc; /* Subtle border around the card */
    transition: all 0.5s ease-in-out;
  }

  .card .mail-container {
    position: absolute;
    right: -2rem; /* Shift the container outside of the card */
    top: 1.4rem;
  }

  .card .mail {
    background: transparent;
    border: none;
  }

  .card .mail svg {
    stroke: #555; /* Remove the pink color and use a neutral color for the icon */
    stroke-width: 2px;
  }

  .card .mail svg:hover {
    stroke: #333; /* Slightly darker color on hover */
  }

  .card .profile-pic {
    position: absolute;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    top: 3px;
    left: 3px;
    border-radius: 29px;
    z-index: 1;
    border: 0px solid #fbb9b6;
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
    bottom: 0;
    left: 3px;
    right: 3px;
    background: rgb(170, 165, 164);
    top: 85%;
    border-radius: 29px;
    z-index: 2;
    box-shadow: rgba(96, 75, 74, 0.1882352941) 0px 5px 5px 0px inset;
    overflow: hidden;
    height: 50px;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  }

  .card .bottom .content {
    position: absolute;
    bottom: 100px;
    left: 1.5rem;
    right: 1.5rem;
    height: 120px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    word-wrap: break-word;
  }

  .card .bottom .content .name {
    display: block;
    font-size: 1.4rem;
    color: white;
    font-weight: bold;
  }

  .card .bottom .content .role {
    display: block;
    font-size: 1.2rem;
    color: white;
    margin-top: 0.5rem;
  }

  .card .bottom .content .about-me {
    display: block;
    font-size: 1.1rem;
    color: white;
    margin-top: 1rem;
  }

  .card .bottom .bottom-bottom {
    position: absolute;
    bottom: 0.5rem;
    left: 1.5rem;
    right: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0;
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
    fill: rgb(164, 156, 156);
    transform: scale(1.2);
  }

  .card .bottom .bottom-bottom .button {
    background: white;
    color: rgb(179, 169, 168);
    border: none;
    border-radius: 20px;
    font-size: 0.6rem;
    padding: 0.4rem 0.6rem;
    box-shadow: rgba(165, 132, 130, 0.1333333333) 0px 5px 5px 0px;
  }

  .card .bottom .bottom-bottom .button:hover {
    background: rgb(193, 182, 182);
    color: white;
  }

  .card:hover {
    border-top-left-radius: 55px;
  }

  .card:hover .bottom {
    top: 20%;
    border-radius: 80px 29px 29px 29px;
    height: auto;
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
    border: 7px solid rgb(69, 66, 66);
    box-shadow: rgba(96, 75, 74, 0.1882352941) 0px 5px 5px 0px;
    transition: all 0.5s ease-in-out, z-index 0.5s ease-in-out 0.1s;
  }

  .card:hover .profile-pic:hover {
    transform: scale(1.3);
    border-radius: 0px;
  }

  .card:hover .profile-pic img {
    transform: scale(2.5);
    object-position: 0px 25px;
    transition: all 0.5s ease-in-out 0.5s;
  }

  .card:hover .profile-pic svg {
    transform: scale(2.5);
    transition: all 0.5s ease-in-out 0.5s;
  }

  .name {
    font-weight: bold;
    font-size: 20px;
  }

  /* Mail box visibility on hover over mail container */
  .card .mail-container:hover .email-box {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s ease, visibility 0s;
  }

  .card .email-box {
    position: absolute;
    top: -1.5rem; /* Position it outside of the card */
    right: -2rem; /* Shift it outside to the right */
    background-color:rgb(56, 53, 53);
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

  /* Make content visible when hovered */
  .card:hover .bottom .content {
    opacity: 1;
    visibility: visible;
  }
`;

export default Facultynewcard;
