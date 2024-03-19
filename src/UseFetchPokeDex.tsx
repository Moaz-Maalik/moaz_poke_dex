import { useState, useEffect } from "react";
import axios from "axios";

interface Pokemon {
  name: string;
  hp: number;
  attack: number;
  defense: number;
}

interface PokemonDetail {
  name: string;
  stats: Array<{ stat: { name: string }; base_stat: number }>;
}

const transformData = (pokemonDetail: PokemonDetail) => {
  return {
    name: pokemonDetail.name,
    hp:
      pokemonDetail.stats.find(
        (stat: { stat: { name: string } }) => stat.stat.name === "hp"
      )?.base_stat || 0,
    attack:
      pokemonDetail.stats.find(
        (stat: { stat: { name: string } }) => stat.stat.name === "attack"
      )?.base_stat || 0,
    defense:
      pokemonDetail.stats.find(
        (stat: { stat: { name: string } }) => stat.stat.name === "defense"
      )?.base_stat || 0,
  };
};

export function useFetchPokeDex() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true);
        const apiData = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=5"
        );
        const pokemonList: Pokemon[] = await Promise.all(
          apiData.data.results.map(
            async (result: { name: string; url: string }) => {
              const pokemonDetailApiData = await axios.get(result.url);
              const pokemonDetail = transformData(pokemonDetailApiData.data);
              return pokemonDetail;
            }
          )
        );
        setPokemons(pokemonList.sort((a, b) => b.hp - a.hp));
        setLoading(false);
      } catch (error) {
        console.error("List could not be fetched :", error);
      }
    };

    getList();
  }, []);
  return { pokemons, loading };
}
