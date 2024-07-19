
const API_URL = "https://rickandmortyapi.com/api";
const localStorageKey = 'characters';

export const fetchCharacters = async () => {
  try {
    let characters = JSON.parse(localStorage.getItem(localStorageKey) || '[]');

    if (characters.length === 0) {
      let allCharacters = [];
      let page = 1;
      let hasNextPage = true;

      while (hasNextPage) {
        const response = await fetch(`${API_URL}/character?page=${page}`);
        if (!response.ok) {
          throw new Error("Error fetching characters");
        }
        const data = await response.json();
        allCharacters = [...allCharacters, ...data.results];
        hasNextPage = data.info.next !== null;
        page += 1;
      }

      characters = allCharacters;
      localStorage.setItem(localStorageKey, JSON.stringify(characters));
    }

    return characters;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};

export const createCharacter = async (newCharacter) => {
  try {
    let characters = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    const id = characters.length ? characters[characters.length - 1].id + 1 : 1;
    const character = { ...newCharacter, id };
    characters.push(character);
    localStorage.setItem(localStorageKey, JSON.stringify(characters));
    return character;
  } catch (error) {
    console.error('Error creating character:', error);
    throw new Error('Error creating character');
  }
};

export const updateCharacter = async (updatedCharacter) => {
  try {
    let characters = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    characters = characters.map((character) =>
      character.id === updatedCharacter.id ? updatedCharacter : character
    );
    localStorage.setItem(localStorageKey, JSON.stringify(characters));
  } catch (error) {
    console.error('Error updating character:', error);
    throw new Error('Error updating character');
  }
};

// Función para obtener un personaje por su ID desde localStorage
export const fetchCharacterById = async (id) => {
  try {
    // Obtener los personajes del localStorage
    const characters = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    
    // Buscar el personaje por su ID
    const character = characters.find(char => char.id === id);

    if (!character) {
      throw new Error(`Character with ID ${id} not found`);
    }

    return character;
  } catch (error) {
    console.error('Error fetching character by ID:', error);
    throw error; // Propaga el error para manejarlo en el componente que llama a esta función
  }
};