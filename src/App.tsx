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
    const [text, setText] = useState('');
    const [completed, setCompleted] = useState(false);
    const apiUrl = 'http://89.169.3.47:8080/api/todos';



    useEffect(() => {
        const apiUrl = 'http://89.169.3.47:8080/api/todos';
        axios.get(apiUrl).then((resp) => {
            const allPersons = resp.data;
            setAppState(allPersons);
        });


    }, [setAppState]);

    const sendToDo = async (text: string, id: number, completed: boolean) => {
        const response = await axios.post(apiUrl, {
            text: text,
            completed: completed,
            id: id,
        })

        setAppState(prevState => [...prevState, response.data]);

        // Очищаем поля ввода
        setText('');
        setCompleted(false);
    }

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
                        <input type="checkbox" checked={post.completed} disabled={true}/>
                    </div>
                ))}
            </div>
            
            <div>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <br/>
                <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
                <br/>
                <button onClick={() => sendToDo(text, appState.length, completed)}>Добавить пост</button>
            </div>

        </>
    )
}

export default App
