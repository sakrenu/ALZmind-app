// import React, { useState, useEffect } from 'react';

// const NewsPage = () => {
//     const [articles, setArticles] = useState([]);

//     useEffect(() => {
//         const fetchNews = async () => {
//             const response = await fetch('http://127.0.0.1:5000/news');
//             const data = await response.json();
//             setArticles(data);  // Assuming your Flask API returns the articles as a JSON array
//         };

//         fetchNews();
//     }, []);

//     return (
//         <div>
//             <h1>Latest News</h1>
//             {articles.length === 0 ? (
//                 <p>Loading...</p>
//             ) : (
//                 articles.map((article, index) => (
//                     <div key={index}>
//                         <h2>{article.title}</h2>
//                         <p>{article.description}</p>
//                         <p>Link: <a href={article.url} target="_blank" rel="noopener noreferrer">{article.url}</a></p>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default NewsPage;


import React, { useState, useEffect } from 'react';
import './NewsPage.css'; // Ensure this CSS file is created for styling

const NewsPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await fetch('http://127.0.0.1:5000/news'); // Ensure this points to the correct backend URL
            const data = await response.json();
            setArticles(data);  // Assuming your Flask API returns the articles as a JSON array
        };

        fetchNews();
    }, []);

    return (
        <div className="bg-lavender min-h-screen p-6 text-white">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-deepviolet">Latest News</h1>
            </header>
            {articles.length === 0 ? (
                <p className="text-periwinkle">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, index) => (
                        <div key={index} className="bg-africanviolet shadow-lg rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-2 text-white">{article.title}</h2>
                            <p className="text-periwinkle mb-4">{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-ultraviolet underline hover:text-deepviolet">
                                Read more
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewsPage;
