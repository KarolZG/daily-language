import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

function LearnVocabularyItem({ item })
{
    const [input, setInput] = useState('');
    const [status, setStatus] = useState(null);

    const checkAnswer = (e) => {
        e.preventDefault();
        if (input.trim().toLowerCase() === item.word.toLowerCase())
        {
            setStatus('correct');
        }
        else
        {
            setStatus('incorrect');
        }
    };

    return (
        <div className={`learning-item ${status ? `is-${status}` : ''}`}>
            <form className="learning-item-form" onSubmit={checkAnswer} autoComplete="off">
                <div className="learning-item-content">
                    <span className="learning-item-label">{item.translation}</span>
                    <ArrowRight size={16} className="learning-item-arrow" />
                    <input
                        type="text"
                        className="learning-item-input"
                        placeholder="Type translation..."
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            if (status) setStatus(null); // Reset status when typing
                        }}
                    />
                </div>
                
                <button className="learning-item-btn" type="submit">
                    Check
                </button>

                <div className="learning-item-feedback">
                    {status === 'correct' && <CheckCircle2 size={20} className="icon-correct" />}
                    {status === 'incorrect' && <XCircle size={20} className="icon-incorrect" />}
                </div>
            </form>
        </div>
    );
}

export default LearnVocabularyItem;