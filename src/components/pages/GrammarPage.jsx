import { useState, useEffect } from 'react';

function GrammarPage() {
    const [grammar, setGrammar] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/grammar')
        .then(res => res.json())
        .then(data => {
            if (data && data.title && data.explanation && data.examples) 
            {
                setGrammar(data);
            }
            setLoading(false);
        });
    }, [])

    if (loading) return <p>Loading...</p>;
    console.log(grammar)
    return (
        <>
            <h1>Daily Grammar</h1>
            <h2>Subject: {grammar.title}</h2>
            <div>
                {grammar.explanation.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
            <br></br>
            <h2>Examples:</h2>
            <ol>
                {grammar.examples.map((item, index) => (
                    <li key={index}>{item.example}</li>
                ))}
            </ol>
        </>
    );
}

export default GrammarPage;