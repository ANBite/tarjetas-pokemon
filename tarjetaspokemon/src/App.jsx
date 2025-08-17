import { useEffect, useState } from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40"); //Busca los primeros 40 Pokémon
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
    <div className="grid grid-cols-3 gap-4 p-4">
      {pokemons.map((p) => (
        <div key={p.id} className="border rounded-xl p-4 shadow-lg text-center">
          <h2 className="text-xl font-bold capitalize">{p.name}</h2>
          <img
            src={p.sprites.other["official-artwork"].front_default}
            alt={p.name}
            className="mx-auto h-32"
          />
          <p>Tipo: {p.types.map((t) => t.type.name).join(", ")}</p>
        </div>
      ))}
    </div>
  );
}

export default App;