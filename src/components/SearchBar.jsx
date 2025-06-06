import { useState } from "react";
import axios from "axios";
import { useMovie } from "../context/MovieContext";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const { results, setResults, searchAll } = useMovie();

  console.log(results);

  // Funzione per ricevere il src delle bandiere

  const getFlagsSrc = (lang) => {
    if (lang === "it") return "/flags/it.png";
    if (lang === "en") return "/flags/en.png";
    return "/flags/other.png";
  };

  return (
    <div>
      <h1>Ricerca Film e serie tv</h1>
      <div>
        <input
          type="text"
          value={query}
          placeholder="Scrivi il nome di un film"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={() => searchAll(query)}>Cerca</button>
      </div>

      <div>
        {results.map((item) => (
          <div key={item.id}>
            <h3>{item.title ?? item.name}</h3>
            <p>
              {/* Titolo Originale: {movie.original_title ?? movie.original_name} */}
            </p>
            <p>
              Lingua:
              <img
                src={getFlagsSrc(item.original_language)}
                alt={item.original_language}
              />
            </p>
            <p>Voto: {item.vote_average}</p>
            <img src={item.poster} alt={item.title ?? item.name} />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

// src={getFlagsSrc(movie.original_language)
