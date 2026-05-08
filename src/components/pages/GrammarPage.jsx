import { useState, useEffect, useRef } from 'react';
import DataGate from '../common/DataGate';
import GrammarView from "../grammar/GrammarView"

function GrammarPage({ onComplete }) {
    const [grammar, setGrammar] = useState(null);
    const [loading, setLoading] = useState(true);
    const notifiedParent = useRef(false);

    useEffect(() => {
        let isMounted = true;
        fetch('/api/grammar')
        .then(res => {
            if (!res.ok) throw new Error("Server error");
            return res.json();
        })
        .then(data => {
            if (data && data.title && data.explanation && data.examples) 
            {
                setGrammar(data);
                if (onComplete && !notifiedParent.current) {
                    onComplete();
                    notifiedParent.current = true;
                }
            }
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            if (isMounted) setLoading(false); 
        })

        return () => { isMounted = false; };
    }, [onComplete])

    
    return (
        <DataGate loading={loading} data={grammar} section="Grammar">
            <GrammarView data={grammar}/>
        </DataGate>
    );
}

export default GrammarPage;