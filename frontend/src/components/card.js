import React from "react";
import styled from "styled-components";

const Card = ({ onClick, title, description }) => {
  console.log(title);
  return (
    <StyledCard onClick={onClick}>
      <div className="card-content">
        <h2 className="title">{title}</h2>
        <p className="description">{description}</p>
      </div>
    </StyledCard>
  );
};

// Styled Component for Card with hover effects for showing description
const StyledCard = styled.div`
  position: relative;
  width: 240px; /* Adjust as per your need */
  height: 320px; /* Adjust as per your need */
  background: rgb(101, 107, 107); /* Background color */
  display: flex;
  flex-direction: column; /* Stack content vertically */
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2); /* Hover effect for shadow */
  }

  .card-content {
    text-align: center;
    padding: 20px;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff; /* Title color */
    margin-bottom: 10px;
  }

  .description {
    color: #f1f1f1; /* Description color */
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    margin-top: 10px;
    font-size: 14px;
  }

  &:hover .description {
    opacity: 1; /* Show description on hover */
  }
`;

export default Card;
