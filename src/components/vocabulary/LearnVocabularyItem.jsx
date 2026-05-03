import { useState } from 'react';

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
        <form onSubmit={checkAnswer} autoComplete="off">
            <label>{item.translation}</label>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}

            />
            <button type="submit">Check</button>

            {status === 'correct' && <span style={{ color: 'green' }}> Correct!</span>}
            {status === 'incorrect' && <span style={{ color: 'red'}}> Incorrect</span>}
        </form>
    );
}

export default LearnVocabularyItem;