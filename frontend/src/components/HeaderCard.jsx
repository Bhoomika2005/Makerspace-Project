import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";

const Card = ({
  header,
  isAdmin,
  handleEditHeader,
  setSelectedHeader,
  setShowDeleteDialog,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/course/${header.id}?title=${header.title}`);
  };

  const onEdit = (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    handleEditHeader(header);
  };

  const onDelete = (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    setSelectedHeader(header);
    setShowDeleteDialog(true);
  };

  return (
    <StyledWrapper header={header}>
      <div className="card" onClick={handleCardClick}>
        <div className="card-content">
          <div className="title">{header.title}</div>
        </div>
      </div>

      {isAdmin && (
        <div className="admin-actions">
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="bg-transparent border-none hover:bg-transparent focus:outline-none"
            >
              <FaEdit className="text-[#027cc4]" />
            </Button>
            <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#0610ab] text-white text-xs rounded px-2 py-1 transition">
              Edit
            </div>
          </div>

          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="bg-transparent border-none hover:bg-transparent focus:outline-none"
            >
              <FaTrash className="text-red-600" />
            </Button>
            <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#0610ab] text-white text-xs rounded px-2 py-1 transition">
              Delete
            </div>
          </div>
        </div>
      )}
    </StyledWrapper>
  );
};

// Styled Component for Card with hover effect
const StyledWrapper = styled.div`
  position: relative;
  width: 100%;

  .card {
    position: relative;
    width: 100%;
    height: 220px;
    background: linear-gradient(135deg, #027cc4, #0610ab);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: bold;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    text-align: center;

    @media (min-width: 768px) {
      width: 400px;
    }

    @media (max-width: 480px) {
      height: 180px;
      font-size: 20px;
    }
  }

  .card-content {
    text-align: center;
    padding: 20px;
    width: 100%;
    transition: opacity 0.3s ease-in-out;
  }

  .title {
    font-size: 25px;
    font-weight: bold;
    color: white;
    margin-bottom: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;

    @media (max-width: 480px) {
      font-size: 20px;
    }
  }

  .description {
    color: #027cc4;
    opacity: 0;
    font-size: 14px;
    margin-top: 10px;
    transition: opacity 0.3s ease-in-out;
  }

  .card:hover .description {
    opacity: 1;
  }

  /* Card hover effect for description */
  .card::before,
  .card::after {
    position: absolute;
    content: "";
    width: 30%;
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: bold;
    background: linear-gradient(135deg, rgb(135, 206, 250), rgb(255, 255, 255));
    transition: all 0.5s;

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }

  .card::before {
    top: 0;
    right: 0;
    border-radius: 0 15px 0 100%;
  }

  .card::after {
    bottom: 0;
    left: 0;
    border-radius: 0 100% 0 15px;
    content: "${(props) => props.header.description}";
    color: rgb(111, 103, 103);
    font-size: 20px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    padding: 10px;
    text-align: center;
    width: 100%;
    height: 100%;

    @media (max-width: 480px) {
      font-size: 16px;
    }
  }

  .card:hover::after {
    opacity: 1;
  }

  .card:hover::before,
  .card:hover::after {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    transition: all 0.5s;
  }

  .admin-actions {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 10px;
    z-index: 10;
  }

  .relative {
    position: relative;
  }

  .group:hover .absolute {
    opacity: 1;
  }
`;

export default Card;
