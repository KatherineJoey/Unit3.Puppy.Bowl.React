import React, { useState, useEffect } from 'react';
import { fetchPlayers } from '../api/puppyBowlApi';
import { useNavigate } from 'react-router-dom';

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPlayers = async () => {
      const data = await fetchPlayers();
    //   console.log('Fetched players data:', data);
    //   if (Array.isArray(data)) {
        setPlayers(data);
    //   } else {
    //     console.error('Data fetched is not an array:', data);
    //   }
    };

    getPlayers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2405-FTB-ET-WEB-PT/players/${id}`, {
        method: 'DELETE',
      });
      setPlayers(players.filter((player) => player.id !== id));
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/players/${id}`);
  };

  return (
    <div className="players">
       {players?.data?.players && players?.data?.players?.length > 0 ? (
        players?.data?.players?.map((player) => (
          <div key={player.id} className="player-card">
            <img
              src={player.imageUrl}
              alt={player.name}
              className="player-image"
              onError={(e) => e.target.src = '/path/to/fallback-image.jpg'}
            />
            <div className="player-details">
              <h2 className="player-name">{player.name}</h2>
              <p className="player-breed">Breed: {player.breed}</p>
              <p className="player-status">Status: {player.status}</p>
              <button id="details" onClick={() => handleViewDetails(player.id)}>View Details</button>
              <button id="delete" onClick={() => handleDelete(player.id)}>Delete</button>
            </div>
          </div>
        ))
    ) : (
      <p>No players available</p>
    )}
  </div>
);
};

export default AllPlayers;
