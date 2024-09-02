export const fetchPlayers = async () => {
    try {
      const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2405-FTB-ET-WEB-PT/players');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  export const fetchPlayerById = async (id) => {
    try {
      const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2405-FTB-ET-WEB-PT/players/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Player not found');
        }
        throw new Error("Failed to fetch new player");
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching player:', error);
      throw error;
    }
  };
  