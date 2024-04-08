import { useState } from "react"
import { bringAllCharacters } from "../../services/apiCalls"
import "./Characters.css"
import { CharacterCard } from "../../components/CharacterCard/CharacterCard"

//------------------------------------------------------

export const Characters = () => {
    const [characters, setCharacters] = useState([])

    const bringCharacters = () => {

        bringAllCharacters()
        .then((res) => {
            setCharacters(res);
            console.log(res);
        })
        .catch((error) => {
            console.log(error, "ups");
        })
    }

    const characterCardClickHandler = (char) => {
        console.log(char);
    }
    return (
        <div className="characters-desing">
            Hola
            <button onClick={bringCharacters}>Personajes</button>
            <ol>
                {characters.map((char) => {
                    return (
                        <CharacterCard key = {char.id}
                        character = {char}
                        handleClick = {() => characterCardClickHandler(char)}
                        />
                    )
                })}
            </ol>
        </div>
    )
}
