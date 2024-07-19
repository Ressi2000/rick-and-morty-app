const API_URL = "https://rickandmortyapi.com/api";
const localStorageKey = 'episodes';

export const fetchEpisodes = async () => {
  try {
    let episodes = JSON.parse(localStorage.getItem(localStorageKey) || '[]');

    if (episodes.length === 0) {
      let allEpisodes = [];
      let page = 1;
      let hasNextPage = true;

      while (hasNextPage) {
        const response = await fetch(`${API_URL}/episode?page=${page}`);
        if (!response.ok) {
          throw new Error("Error fetching episodes");
        }
        const data = await response.json();
        allEpisodes = [...allEpisodes, ...data.results];
        hasNextPage = data.info.next !== null;
        page += 1;
      }

      episodes = allEpisodes;
      localStorage.setItem(localStorageKey, JSON.stringify(episodes));
    }

    return episodes;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }
};

export const createEpisode = async (newEpisode) => {
  try {
    let episodes = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    const id = episodes.length ? episodes[episodes.length - 1].id + 1 : 1;
    const episode = { ...newEpisode, id };
    episodes.push(episode);
    localStorage.setItem(localStorageKey, JSON.stringify(episodes));
    return episode;
  } catch (error) {
    console.error('Error creating episode:', error);
    throw new Error('Error creating episode');
  }
};

export const updateEpisode = async (updatedEpisode) => {
  try {
    let episodes = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    episodes = episodes.map((episode) =>
      episode.id === updatedEpisode.id ? updatedEpisode : episode
    );
    localStorage.setItem(localStorageKey, JSON.stringify(episodes));
  } catch (error) {
    console.error('Error updating episode:', error);
    throw new Error('Error updating episode');
  }
};

export const fetchEpisodeById = async (id) => {
  try {
    const episodes = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    const episode = episodes.find(ep => ep.id === id);

    if (!episode) {
      throw new Error(`Episode with ID ${id} not found`);
    }

    return episode;
  } catch (error) {
    console.error('Error fetching episode by ID:', error);
    throw error;
  }
};
