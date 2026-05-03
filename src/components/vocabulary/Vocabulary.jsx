function Vocabulary({ vocabulary = [] }) {
    return (
        <div className="vocab-container">
            <h1>Vocabulary List</h1>
            <ul>
                {vocabulary.map((item, index) => (
                    <li key={index} className="vocab-item">
                        <h3>{item.word} - <em>{item.translation}</em></h3>
                        <p><strong>Variation: </strong> {item.special}</p>
                        <p><strong>Memorization cue:</strong> {item.cue}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Vocabulary;