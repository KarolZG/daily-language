import LearnVocabularyItem from "./LearnVocabularyItem";

function LearnVocabulary({ vocabulary = [] }) {
    return (
        <div className="vocab-learning">
            <h1>Practice Vocabulary</h1>
            {vocabulary.map((item, index) => (
                <LearnVocabularyItem key={index} item={item} />
            ))}
        </div>
    );
}

export default LearnVocabulary;