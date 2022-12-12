import React, {useState} from 'react';
import axios from "axios";
import {useEffect} from "react";

function PokemonCard({name,classname}) {

    const [pokemonData, setPokemonData] = useState({})

    useEffect(()=>{
        async function fetchData(){
            try{
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                console.log(result)
                setPokemonData(result)
            } catch (e){
                console.error(e)
            }
        }
        fetchData()
    },[])
    return (
        <>
            {Object.keys(pokemonData).length > 0 &&
                <>
                    <h2>{pokemonData.data.name}</h2>
                    <img src={pokemonData.data.sprites.front_default} alt='of-pokemon'/>
                    <ul>
                        {pokemonData.data.abilities.map((a)=>{
                            return <li key={a.ability.name}>{a.ability.name}</li>
                        })}
                    </ul>
                    <p>{pokemonData.data.weight}</p>
                    <p>{pokemonData.data.moves.length}</p>
                </>}
        </>
    );
}

export default PokemonCard;