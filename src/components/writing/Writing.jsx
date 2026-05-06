import { useState } from "react";
import WritingFeedback from "./WritingFeedback";
import WritingExercise from "./WritingExercise";

function Writing({ instruction, writing, setWriting, savedFeedback }) {
    const [feedback, setFeedback] = useState(savedFeedback || null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        setSubmitting(true);

        try {
                const response = await fetch('/api/writing', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ writing: writing })
                });

                const data = await response.json();
                setFeedback(data);
        } catch (error) {
            console.error("Submission failed:", error);
            setSubmitting(false);
        }
    }

    if (feedback) {
        return (
            <WritingFeedback writing={writing} feedback={feedback} />
        );
    }

    return (
        <WritingExercise 
            instruction={instruction}
            writing={writing}
            setWriting={setWriting}
            submitting={submitting}
            handleSubmit={handleSubmit}
        />
    );
}

export default Writing;