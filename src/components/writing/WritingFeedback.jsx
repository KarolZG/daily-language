function WritingFeedback({ writing, feedback }) {
    return (
        <div className="feedback-view">
            <h2>Your Writing</h2>
            <p>{writing}</p>
            
            <div className="feedback-container">
                <h2>Feedback</h2>
                <p><strong>Mistakes: </strong>{feedback.mistakes}</p>
                <p><strong>Corrected Version: </strong>{feedback.corrected_version}</p>
                <p><strong>Feedback: </strong>{feedback.feedback}</p>
            </div>
        </div>
    );
}

export default WritingFeedback;