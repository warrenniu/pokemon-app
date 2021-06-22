import React, {useState, useEffect} from 'react';
import PokemonList from './PokemonList'
import Pagination from './Pagination'
import './App.css';
import axios from 'axios';

function App() {


  const [pokemon, setPokemon] = useState(["bulbasaur", "charmander"])
  //set default state to the first page of our pokemons
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  //set loading state. lets users know that page is working
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    //sets loading state to true to let user know that page is loading
    setLoading(true)

    let cancel
    //axios operates similarly to fetch
    axios.get(currentPageUrl, {
      //initializing a axios object with a key cancelToken -> cancels our previous axios request before another one is made to prevent overlap
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(response => {
      //response is loaded. page is no longer loading
      setLoading(false)
      setNextPageUrl(response.data.next)
      setPrevPageUrl(response.data.previous)
      setPokemon(response.data.results.map(p => p.name))
    })

    //clean up our request each time we run useEffect
    return () => cancel()
  }, [currentPageUrl]) //we want to re-run our useEffect function anytime our currentPageUrl state changes

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."

  return (
    <>
   <PokemonList pokemon={pokemon} />
   <Pagination goToNextPage={nextPageUrl ? goToNextPage : null} goToPrevPage={prevPageUrl ? goToPrevPage : null}/>
   </>
  );
}

export default App;
