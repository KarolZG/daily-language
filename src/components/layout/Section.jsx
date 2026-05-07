import { useState } from 'react';
import { ChevronUp, ChevronDown} from 'lucide-react';

function Section({ title, children, defaultOpen = true }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`section-div ${isOpen ? 'is-open' : ''}`}>
            <div 
                className='section-header'
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className='section-title'>{title}</h3>
                <span className='section-icon'>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
            </div>

            {isOpen && (
                <div className='section-content'>
                    {children}
                </div>
            )}
        </div>
    );
}

export default Section;