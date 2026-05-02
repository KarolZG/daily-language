function LearnVocabulary({ vocabulary = [] }) {
    return (
        <div className="vocab-learning">
            <h1>Practice Vocabulary</h1>
            {vocabulary.map((item, index) => (
                <form autoComplete="off">
                    <label htmlFor={"question-" + index}>{item.translation}</label>
                    <input id={"question-" + index} type="text"/>
                    <button type="submit">Check</button>
                </form>
            ))}
        </div>
    );
}

export default LearnVocabulary;