import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

interface todo {
    text: string;
    completed: boolean;
    id: number;
}

function App() {
    const [appState, setAppState] = useState<todo[]>([]);


    useEffect(() => {
        const apiUrl = 'http://89.169.3.47:8080/api/todos';
        axios.get(apiUrl).then((resp) => {
            const allPersons = resp.data;
            setAppState(allPersons);
        });
    }, [setAppState]);


    return (
        <>
            <div className="header">
                <div className="headerObjectBlock">
                    <a className="headerObject">object1</a>
                </div>
                <div className="headerObjectBlock">
                    <a className="headerObject"><img src={viteLogo} alt="Vite Logo" /></a>
                    <a className="headerObject"><img src={reactLogo} alt="React Logo" /></a>
                </div>
            </div>

            <div className="body">
                {appState.slice(0, appState.length).map((post) => (
                    <div>
                        <p>{post.text}</p>
                    </div>
                ))}
            </div>

        </>
    )
}

export default App
