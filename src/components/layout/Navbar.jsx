import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

function Navbar({ status }) {
    const { vocabDone, grammarDone } = status;

    return (
        <nav className="navbar">
                {/* Entree point - always available */}
                <Link to="/">Vocabulary</Link>

                {/* Available only after the successful vocabulary generation */}
                {vocabDone ? (
                    <Link to="/grammar"> ➡️ Grammar</Link>
                ) : (
                    <span className="locked-link" title="Generate daily vocabulary first">
                        <Lock size={14} /> Grammar
                    </span>
                )}

                {/* Available only after the grammar generation */}
                {grammarDone ? (
                    <Link to="/writing"> ➡️ Writing</Link>
                ) : (
                    <span className="locked-link" title="Generate daily grammmar first">
                        <Lock size={14} /> Writing
                    </span>
                )}
        </nav>
    );
}

export default Navbar;