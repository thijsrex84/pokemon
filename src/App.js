import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import PokemonCard from "./Components/PokemonCard";




function App() {
    const [pokeArmy, setPokeArmy] = useState([])
    const [currentUrl, setCurrentUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`)
    const [nextUrl, setNextUrl ] = useState(``)
    const [previousUrl, setPreviousUrl] = useState(``)


    useEffect(()=>{
        const abortCont = new AbortController()
    async function fetchPokemons(){
        try{ const response = await axios.get(currentUrl,{signal:abortCont.signal})
            console.log(response)
            setNextUrl(response.data.next)
            setPreviousUrl(response.data.previous)
            setPokeArmy(response.data.results)
        } catch (e) {
            console.error(e)
        }
    }
    fetchPokemons()
    return()=> abortCont.abort();
    },[currentUrl])


    function nextPage(){
        setCurrentUrl(nextUrl)
    }
    function previousPage(){
        setCurrentUrl(previousUrl)
    }
    return(
        <>
            <button onClick={previousPage && previousPage}>Previous</button>
            <button onClick={nextPage && nextPage}>Next</button>
        <ul>{pokeArmy.map((gotThemAll)=>{
            return <PokemonCard classname="card" name={gotThemAll.name} key={gotThemAll.name}></PokemonCard>
        })}</ul>
        </>
            )

}

export default App;


