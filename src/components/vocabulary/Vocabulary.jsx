function Vocabulary({ vocabulary = [] }) {
    return (
        <div className="vocabulary-container">
            <header className="vocabulary-header">
                <h2 className="vocabulary-title">Vocabulary List</h2>
                <span className="vocabulary-count">{vocabulary.length} terms generated</span>
            </header>
            
            <div className="vocabulary-grid">
                {vocabulary.map((item, index) => (
                    <div key={index} className="vocabulary-card">
                        <div className="vocabulary-card-main">
                            <span className="vocabulary-word">{item.word}</span>
                            <span className="vocabulary-translation">{item.translation}</span>
                        </div>
                        
                        <div className="vocabulary-card-details">
                            <div className="vocabulary-detail-group">
                                <span className="vocabulary-label">Variation</span>
                                <p className="vocabulary-text">{item.special}</p>
                            </div>
                            
                            <div className="vocabulary-detail-group">
                                <span className="vocabulary-label">Memorization Cue</span>
                                <p className="vocabulary-cue-text">{item.cue}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Vocabulary;