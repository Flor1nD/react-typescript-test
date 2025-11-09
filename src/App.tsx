import { useState, type ChangeEvent } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


interface post {
    name: string;
    country: string;
    domains: string[];
    web_pages: string[];
}

function App() {
    const [posts, setPosts] = useState<post[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedCountry, setSelectedCountry] = useState<string>('');

    const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        const countryValue: string = event.target.value;
        setSelectedCountry(countryValue);
    };

    const setPost = async (nameCountry: string)=> {
        try {
            setLoading(true);
            console.log("Загрузка...");
            const response = await fetch(`http://universities.hipolabs.com/search?country=${nameCountry}`)

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

    // const deletePost = (postId: number)=> {
    //     setPosts(posts.filter((post) => post.id !== postId))
    // }

    return (
        <>
            <div className="header">
                <div className="headerObjectBlock">
                    <a className="headerObject">Поиск университетов по стране</a>
                </div>
                <div className="headerObjectBlock">
                    <a className="headerObject"><img src={viteLogo} alt="Vite Logo" /></a>
                    <a className="headerObject"><img src={reactLogo} alt="React Logo" /></a>
                </div>
            </div>

            <div className="body">

                <select value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">Выберите страну</option>
                    <option value="Russian Federation">Россия</option>
                    <option value="Kazakhstan">Казахстан</option>
                    <option value="India">Индия</option>
                    <option value="France">Франция</option>
                    <option value="Germany">Германия</option>

                </select>

                <button disabled={loading || !selectedCountry} onClick={() =>  setPost(selectedCountry)}>
                    {loading ? "Загрузка..." : "Сгенерить универы"}
                </button>

                {error && (
                    <div style={{ color: 'red' }}>
                        Ошибка: {error}
                    </div>
                )}

                {posts.length > 0 &&
                    (
                        <div style={{
                            display: 'flex',
                            flexDirection: "column",
                            alignItems: "center",
                            width: '75%',

                        }}>
                            {posts.slice(0, posts.length).map((post) => (
                                <div /*key={post.id}*/ style={{ margin: '10px', border: "1px solid black", padding: '15px', borderRadius: '10px', width: "80%" }}>
                                    <h3>{post.name}</h3>
                                    <p>{post.country}</p>
                                    {post.web_pages.slice(0, post.web_pages.length).map((web_page) => (
                                        <div>
                                            <a style={{textDecoration: "none"}} href={web_page} target={"_blank"}>{web_page}</a>
                                            <br/>
                                        </div>

                                    ))}
                                    {/*<button onClick={() => {*/}
                                    {/*    deletePost(post.id);*/}
                                    {/*}}*/}
                                    {/*        style={{*/}
                                    {/*            padding: '6px',*/}
                                    {/*            backgroundColor: 'red',*/}
                                    {/*            border: '1px solid red',*/}
                                    {/*            borderRadius: '35px',*/}
                                    {/*            color: 'white',*/}

                                    {/*        }}>*/}
                                    {/*    Удалить*/}
                                    {/*</button>*/}
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
