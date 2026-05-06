function WritingExercise({ instruction, writing, setWriting, submitting, handleSubmit }) {
    return (
        <div className="writing-container">
            <p>{instruction}</p>
            <textarea
                id="user-writing"
                value={writing}
                onChange={(e) => setWriting(e.target.value)}
                placeholder="Type your work here..."
                disabled={submitting}
            />
            <button onClick={handleSubmit}>
                {submitting ? "Submitting..." : "Submit Writing"}
            </button>
        </div>
    );
}

export default WritingExercise;