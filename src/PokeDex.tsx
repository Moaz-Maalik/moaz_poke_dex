import { useFetchPokeDex } from "./UseFetchPokeDex";

const Pokedex: React.FC = () => {
  const { pokemons, loading } = useFetchPokeDex();

  return (
    <div>
      <h1>Pokedex</h1>
      <ul>
        {loading ? (
          <>loading</>
        ) : (
          pokemons.map((pokemon, index) => (
            <li key={index}>
              <strong>{pokemon.name}</strong> - HP: {pokemon.hp} | Attack:{" "}
              {pokemon.attack} | Defense: {pokemon.defense}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Pokedex;
