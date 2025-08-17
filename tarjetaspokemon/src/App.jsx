import { useEffect, useState } from "react";
import "./App.css"; 

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      // Muestra los primeros 151 pokémones (Generación 1)
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151"); 
      const data = await response.json();

      const details = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url);
          return await res.json();
        })
      );

      setPokemons(details);
    }
    fetchPokemons();
  }, []);

  return (
    <div className="app">
      <h1 className="title">Tarjetas Pokémon</h1>

      <div className="grid">
        {pokemons.map((p) => (
          <div key={p.id} className="card">
            <div className="card-image">
              <img
                src={p.sprites.other["official-artwork"].front_default}
                alt={p.name}
              />
            </div>
            <p className="card-name">
              {p.name} <br />
              <span className="card-type">
                {p.types.map((t) => t.type.name).join(", ")}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
