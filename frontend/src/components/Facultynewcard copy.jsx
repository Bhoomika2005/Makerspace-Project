import { Mail, Pencil, Trash } from "lucide-react";
import React, { useState } from "react";
import styled from "styled-components";

const Facultynewcard = ({
  name,
  role,
  image,
  email,
  location,
  onEdit,
  onDelete,
  isAdmin,
}) => {
  const [copyMessage, setCopyMessage] = useState("");
  // const [hoverEmailMessage, setHoverEmailMessage] = useState("");

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(email); // Copies the email to clipboard
      setCopyMessage("Email copied!"); // Show notification that the email has been copied
      setTimeout(() => setCopyMessage(""), 5000); // Clear message after 2 seconds
    } catch (error) {
      console.error("Failed to copy email: ", error);
      setCopyMessage("Failed to copy"); // In case copying fails
      setTimeout(() => setCopyMessage(""), 5000); // Clear message after 2 seconds
    }
  };

  // const handleMailHover = () => {
  //   setHoverEmailMessage(email); // Show the email when the mail icon is hovered
  //   console.log("hoverEmailMessage : ", hoverEmailMessage);
  //   setTimeout(() => setHoverEmailMessage(""), 5000); // Hide the email after 5 seconds
  // };

  return (
    <StyledWrapper>
      <div className="card">
        <div className="actions-row">
          {isAdmin && (
            <>
              <div className="edit-action">
                <button className="action-btn" onClick={onEdit}>
                  <Pencil className="text-[#026bc0] group-hover:text-white transition-colors duration-200" />
                </button>
                <div className="tooltip">Edit</div>
              </div>

              <div className="delete-action">
                <button className="action-btn delete" onClick={onDelete}>
                  <Trash className="text-[#c5303c] group-hover:text-white transition-colors duration-200" />
                </button>
                <div className="tooltip">Delete</div>
              </div>
            </>
          )}

          <div className="email-action">
            <button
              className="action-btn"
              onClick={handleEmailClick}
              title="Copy Email"
            >
              <Mail className="group-hover:text-[#034a8f] transition-colors duration-200" />
            </button>
            <div className="tooltip">Copy Email</div>
          </div>
        </div>

        {copyMessage && <div className="copy-notification">{copyMessage}</div>}

        {/* Profile Image */}
        <div className="profile-pic">
          <img
            src={
              image
                ? `http://172.16.1.81${image}`
                : "/placeholder.svg?height=300&width=500"
            }
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
    top: 84%;
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
    font-size: 20px;
    color: white;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 2rem;
    position: absolute;
  }

  .card .bottom .content .about-me {
    visibility: hidden;
    opacity: 0;
    font-size: 1.1rem;
    color: white;
    margin-top: 1rem;
    transition: opacity 0.3s ease, visibility 0s linear 0.3s;
  }

  .card:hover .bottom .content .about-me {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  .card .bottom .bottom-bottom {
    position: absolute;
    bottom: 1rem;
    left: 1.5rem;
    right: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
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
    color: #026bc0;
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
  }

  .actions-row {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 15px;
  opacity: 0; /* Initially hidden */
  visibility: hidden; /* Hide by default */
  transition: opacity 0.3s ease, visibility 0s linear 0.3s; /* Smooth transition */
}

.card:hover .actions-row {
  opacity: 1; /* Show on hover */
  visibility: visible; /* Ensure it is visible */
}

.edit-action, .delete-action, .email-action {
  position: relative;
}

.action-btn {
  padding: 0.4rem 0.6rem;
  background-color: white;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Icons appearance on hover */
.card:hover .action-btn {
  visibility: visible;
}

/* Tooltips for individual actions */
.edit-action .tooltip, 
.delete-action .tooltip, 
.email-action .tooltip {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #0610ab;
  color: white;
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 5px;
  transition: visibility 0.2s, opacity 0.3s;
  z-index: 10;
}

/* Show tooltips on hover */
.edit-action:hover .tooltip,
.delete-action:hover .tooltip,
.email-action:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

/* Action button hover styles */
.edit-action .action-btn:hover {
  background-color: #026bc0;
}

.delete-action .action-btn:hover {
  background-color: #c5303c;
}

.email-action .action-btn:hover {
  background-color: #0e91d5;
}

/* Copy email notification */
.copy-notification {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #0e91d5;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 0.9rem;
  opacity: 1;
  transition: opacity 0.5s ease;
}
  }
`;

export default Facultynewcard;
