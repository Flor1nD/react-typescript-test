import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


interface post {
    id: number;
    title: string;
    body: string;
}

function App() {
    const [posts, setPosts] = useState<post[]>([])

    const setPost = async ()=> {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=7')

            if (!response) {
                throw new Error('Unable to fetch posts.')
            }
            const data = await response.json();
            setPosts(data);
        }
        catch (err) {
            console.error(err)
        }
    }

    const deletePost = (postId: number)=> {
        setPosts(posts.filter((post) => post.id !== postId))
    }

    return (
        <>
            <div className="header">
                <div className="headerObjectBlock">
                    <a className="headerObject">object1</a>
                    <button className="headerObject" onClick={setPost}>
                        Сгенерить посты
                    </button>
                </div>
                <div className="headerObjectBlock">
                    <a className="headerObject"><img src={viteLogo} alt="Vite Logo" /></a>
                    <a className="headerObject"><img src={reactLogo} alt="Vite Logo" /></a>
                </div>
            </div>

            {posts.length > 0 &&
                (
                    <div style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
                        {posts.slice(0, posts.length).map((post) => (
                            <div key={post.id} style={{ margin: '10px', border: "1px solid black", borderRadius: '10px', padding: '5px', width: "75%" }}>
                                <h3>{post.title}</h3>
                                <p>{post.body}</p>
                                <button onClick={() => {
                                    deletePost(post.id);
                                }}
                                style={{
                                    padding: '6px',
                                    backgroundColor: 'red',
                                    border: '1px solid red',
                                    borderRadius: '35px',
                                    color: 'white',

                                }}>
                                    Удалить
                                </button>
                            </div>
                        ))}
                    </div>
                )
            }

        </>
    )
}

export default App
