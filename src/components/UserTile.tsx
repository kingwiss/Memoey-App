import React from 'react';
import '../App.css';

interface UserTileProps {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const UserTile: React.FC<UserTileProps> = ({ icon, title, description, onClick }) => {
  return (
    <div className="user-tile" onClick={onClick}>
      <img src={icon} alt={title} className="tile-icon" />
      <h3 className="tile-title">{title}</h3>
      <p className="tile-description">{description}</p>
    </div>
  );
};

export default UserTile;