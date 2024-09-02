import React, { useState } from 'react';

const NewPlayerForm = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [status, setStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2405-FTB-ET-WEB-PT/players', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, breed, status, imageUrl }),
      });

    //   if (!response.ok) {
    //     throw new Error("Failed to add player");
    //   }

    //   setSuccessMessage('Player added successfully!');
    //   setErrorMessage('');
      setName('');
      setBreed('');
      setStatus('');
      setImageUrl('');
    } catch (error) {
    //   console.error('Error adding player:', error);
    //   setErrorMessage('Error adding player: ' + error.message);
    //   setSuccessMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        placeholder="Breed"
        required
      />
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Status"
        required
      />
      <input
        type="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
    />
      <button id="add" type="submit">Add Player</button>
      {/* {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
    </form>
  );
};

export default NewPlayerForm;
