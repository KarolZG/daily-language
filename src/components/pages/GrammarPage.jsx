import { useState, useEffect } from 'react';
import GrammarView from "../grammar/GrammarView"

function GrammarPage({ onComplete }) {
    const [grammar, setGrammar] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/grammar')
        .then(res => res.json())
        .then(data => {
            if (data && data.title && data.explanation && data.examples) 
            {
                setGrammar(data);
                onComplete();
            }
            setLoading(false);
        });
    }, [onComplete])

    if (loading) return <p>Loading...</p>;
    if (!grammar) return <p>Error loading grammar.</p>
    
    return (
        <GrammarView data={grammar}/>
    );
}

export default GrammarPage;