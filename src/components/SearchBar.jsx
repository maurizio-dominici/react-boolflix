import React, { useState } from "react";
import axios from "axios";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchMovies = () => {
    axios
      .get(import.meta.env.VITE_API_URL, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: "it-IT",
          query: query,
        },
      })
      .then((response) => {
        setResults(response.data.results);
      })
      .catch((error) => {
        console.error("Errore nella richiesta:", error);
      });
  };

  return (
    <div>
      <h1>Ricerca Film</h1>
      <div>
        <input
          type="text"
          value={query}
          placeholder="Scrivi il nome di un film"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Cerca</button>
      </div>

      <div>
        {results.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>Titolo Originale: {movie.original_title}</p>
            <p>Lingua: {movie.original_language}</p>
            <p>Voto: {movie.vote_average}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
