import { createContext, useContext, useState } from "react";
import axios from "axios";

const MovieContext = createContext();

function MovieProvider({ children }) {
  const [results, setResults] = useState([]);

  const searchAll = (query) => {
    axios
      .get(import.meta.env.VITE_API_URL, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: "it-IT",
          query,
        },
      })
      .then((movieRes) => {
        const movieResults = movieRes.data.results.map((item) => ({
          id: item.id,
          type: "movie",
          title: item.title,
          original_title: item.original_title,
          original_language: item.original_language,
          vote_average: item.vote_average,
          poster: "https://image.tmdb.org/t/p/w342" + item.poster_path,
        }));

        axios
          .get("https://api.themoviedb.org/3/search/tv", {
            params: {
              api_key: import.meta.env.VITE_API_KEY,
              language: "it-IT",
              query,
            },
          })
          .then((tvRes) => {
            const tvResults = tvRes.data.results.map((item) => ({
              id: item.id,
              type: "tv",
              title: item.name,
              original_title: item.original_name,
              original_language: item.original_language,
              vote_average: item.vote_average,
              poster: "https://image.tmdb.org/t/p/w342" + item.poster_path,
            }));

            setResults([...movieResults, ...tvResults]);
          })
          .catch((err) => {
            console.error("Errore  serie TV:", err);
            setResults(movieResults);
          });
      })
      .catch((err) => {
        console.error("Errore Film:", err);
        setResults([]);
      });
  };

  const movieData = { results, setResults, searchAll };
  return (
    <MovieContext.Provider value={movieData}>{children}</MovieContext.Provider>
  );
}

function useMovie() {
  return useContext(MovieContext);
}

export { MovieProvider, useMovie };
