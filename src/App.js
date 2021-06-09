import React, {useState, useEffect} from 'react';
import PokemonList from './PokemonList'
import './App.css';
import axios from 'axios';

function App() {


  const [pokemon, setPokemon] = useState(["bulbasaur", "charmander"])

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon').then(response => {
      console.log(response)
      setPokemon(response.data.results.map(p => p.name))
    })
  }, [])

  return (
   <PokemonList pokemon={pokemon} />
  );
}

export default App;
