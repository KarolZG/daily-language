import { useState, useEffect } from "react";
import Writing from "../writing/Writing";

function WritingPage({ writing, setWriting }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetch('/api/writing')
        .then(res => res.json())
        .then(response => {
            if (response) setData(response);
            if (response.writing) setWriting(response.writing);
            setLoading(false);
        });
    }, [setWriting]);

    const handleSubmit = async () => {
        setSubmitting(true);

        try {
                const response = await fetch('/api/writing', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ writing: writing })
                });

                const feedback = await response.json();

                setData(prev => ({...prev, ...feedback}));
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="loading-container">
            <div className="gemini-loader"></div>
            <p>Fetching Daily Writing</p>
        </div>
    );

    return (
        <>
            <Writing
                instruction={data.instruction}
                writing={writing}
                setWriting={setWriting}
                savedFeedback={data.feedback ? data : null}
                onSumbit={handleSubmit}
                isSubmitting={submitting}
            />
        </>
    );
}

export default WritingPage;