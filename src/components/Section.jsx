import { useState } from 'react';

function Section({ title, children }) {
    const [isOpen, setIsOpen] = useState('true');

    return (
        <div className='section' style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <div 
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: 'pointer', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}
            >
                {title}
                <span>{isOpen ? '▲ Collapse' : '▼ Expand' }</span>
            </div>

            {isOpen && (
                <div className='section-content' style={{ marginTop: '10px' }}>
                    {children}
                </div>
            )}
        </div>
    );
}

export default Section;