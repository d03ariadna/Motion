import { useState, useEffect } from "react";

export default function Dictionary() {
    const [word, setWord] = useState('Firstdone');

    useEffect(() => {
        console.log('State changed', word);
    });

    return (
        <>
            <input type='text' onChange={(e) => { 
                setWord((e.target.value))
            }} />
            <h1>Let's get the definition for {word}</h1>
        </>
    )
}