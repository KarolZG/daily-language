import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

function LearnVocabularyItem({ index, item })
{
    const [input, setInput] = useState('');
    const [status, setStatus] = useState(null);

    // Verifing the user input
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

    // Keys navigation between the learn-item inputs
    const handleKeyDown = (e, index) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();

            const inputs = document.querySelectorAll(".learning-item-input");
            const nextIndex = e.key === 'ArrowDown' ? index + 1 : index - 1;

            if (inputs[nextIndex]) {
                inputs[nextIndex].focus();
            }
        }
    }

    return (
        <div index={index} className={`learning-item ${status ? `is-${status}` : ''}`}>
            <form className="learning-item-form" onSubmit={checkAnswer} autoComplete="off">
                <div className="learning-item-content">
                    <span className="learning-item-label">{item.translation}</span>
                    <ArrowRight size={16} className="learning-item-arrow" />
                    <input
                        type="text"
                        className="learning-item-input"
                        placeholder="Type translation..."
                        value={input}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onChange={(e) => {
                            setInput(e.target.value);
                            // Reset status when typing
                            if (status) setStatus(null);
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