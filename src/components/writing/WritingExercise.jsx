import { PenLine, Send } from 'lucide-react';

function WritingExercise({ instruction, writing, setWriting, submitting, handleSubmit }) {
    return (
        <div className="writing-container">
            <header className="writing-header">
                <div className="writing-icon-circle">
                    <PenLine size={20} />
                </div>
                <div className="writing-instruction-group">
                    <span className="writing-label">Writing Prompt</span>
                    <p className="writing-instruction-text">{instruction}</p>
                </div>
            </header>

            <div className="writing-editor-wrapper">
                <textarea
                    className="writing-textarea"
                    id="user-writing"
                    value={writing}
                    onChange={(e) => setWriting(e.target.value)}
                    placeholder="Start composing your response..."
                    disabled={submitting}
                />
            </div>

            <div className="writing-actions">
                <button 
                    className={`writing-submit-btn ${submitting ? 'is-loading' : ''}`}
                    onClick={handleSubmit} 
                    disabled={submitting || !writing.trim()}
                >
                    {submitting ? (
                        "Analyzing..." 
                    ) : (
                        <>
                            <span>Submit Writing</span>
                            <Send size={18} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default WritingExercise;