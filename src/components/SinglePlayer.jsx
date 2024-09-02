import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPlayerById } from "../api/puppyBowlApi";
import "../SinglePlayer.css";

const SinglePlayer = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPlayer = async () => {
      try {
        const data = await fetchPlayerById(id);
        setPlayer(data);
      } catch (error) {
        console.error("Error fetching player:", error);
        setError(error.message || "Failed to fetch player details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getPlayer();
    } else {
      setError("Invalid player ID");
      setLoading(false);
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      try {
        await fetch(
          `https://fsa-puppy-bowl.herokuapp.com/api/2405-FTB-ET-WEB-PT/players/${id}`,
          { method: "DELETE" }
        );
        navigate("/");
      } catch (error) {
        console.error("Error deleting player:", error);
        setError("Failed to delete player");
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!player || !player.data || !player.data.player) {
    return <div>Player not found</div>;
  }

  const { imageUrl, name, breed, status } = player.data.player;

  return (
    <div className="player-details">
      <img
        src={player.data.player.imageUrl}
        alt={player.data.player.name}
        className="player-image"
        onError={(e) => (e.target.src = "/path/to/fallback-image.jpg")}
      />
      <h4 className="player-name">{player.data.player.name}</h4>
      <p className="player-breed">Breed: {player.data.player.breed}</p>
      <p className="player-status">Status: {player.data.player.status}</p>
      <button id="home" onClick={handleBack}>
        Back to Home
      </button>
      <button id="delete" onClick={handleDelete}>
        Delete Player
      </button>
    </div>
  );
};

export default SinglePlayer;
