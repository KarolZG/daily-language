import LearnVocabularyItem from "./LearnVocabularyItem";

function LearnVocabulary({ vocabulary = [] }) {
    return (
        <div className="learning-container">
            <header className="learning-header">
                <h2 className="learning-title">Practice Session</h2>
                <p className="learning-subtitle">Translate the following terms into the target language.</p>
            </header>
            
            <div className="learning-list">
                {vocabulary.map((item, index) => (
                    <LearnVocabularyItem key={index} index={index} item={item} />
                ))}
            </div>
        </div>
    );
}

export default LearnVocabulary;