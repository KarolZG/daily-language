import { useState, useEffect } from "react";
import Writing from "../writing/Writing";

function WritingPage({ writing, setWriting }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/writing')
        .then(res => res.json())
        .then(response => {
            if (response) setData(response);
            if (response.writing) setWriting(response.writing);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading...</p>

    return (
        <>
            <Writing
                instruction={data.instruction}
                writing={writing}
                setWriting={setWriting}
                savedFeedback={data.feedback ? data : null}
            />
        </>
    );
}

export default WritingPage;