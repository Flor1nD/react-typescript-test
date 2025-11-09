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
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const setPost = async ()=> {
        try {
            setLoading(true);
            console.log("Загрузка...");
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=13')

            if (!response) {
                throw new Error('Unable to fetch posts.')
            }
            const data = await response.json();
            setPosts(data);
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
        finally {
            setLoading(false);
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
                    <button className="headerObject" onClick={setPost} disabled={loading}>
                        {loading ? "Загрузка..." : "Сгенерить посты"}
                    </button>
                </div>
                <div className="headerObjectBlock">
                    <a className="headerObject"><img src={viteLogo} alt="Vite Logo" /></a>
                    <a className="headerObject"><img src={reactLogo} alt="React Logo" /></a>
                </div>
            </div>

            <div className="body">
                {error && (
                    <div style={{ color: 'red' }}>
                        Ошибка: {error}
                    </div>
                )}

                {posts.length > 0 &&
                    (
                        <div style={{
                            border: '1px solid red',
                            display: 'flex',
                            flexDirection: "column",
                            alignItems: "center",
                            width: '75%',

                        }}>
                            {posts.slice(0, posts.length).map((post) => (
                                <div key={post.id} style={{ margin: '10px', border: "1px solid black", padding: '15px', borderRadius: '10px', width: "80%" }}>
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
            </div>

        </>
    )
}

export default App
