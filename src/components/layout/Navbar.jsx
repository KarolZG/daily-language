import { NavLink } from 'react-router-dom';
import { Lock } from 'lucide-react';

function Navbar({ status }) {
    const { vocabDone, grammarDone } = status;

    // Helper function setting the link styling
    const getLinkClass = ({ isActive }) => {
        return isActive ? "nav-link active" : "nav-link";
    }

    return (
        <nav className="navbar-container">
            <div className="navbar-pill">
                {/* Entree point - always available */}
                <NavLink to="/" className={getLinkClass}>
                    Vocabulary
                </NavLink>

                {/* Available only after the successful vocabulary generation */}
                {vocabDone ? (
                    <NavLink to="/grammar" className={getLinkClass}>
                        Grammar
                    </NavLink>
                ) : (
                    <span className="nav-link locked" title="Generate daily vocabulary first">
                        <Lock size={14} /> Grammar
                    </span>
                )}

                {/* Available only after the grammar generation */}
                {grammarDone ? (
                    <NavLink to="/writing" className={getLinkClass}>
                        Writing
                    </NavLink>
                ) : (
                    <span className="nav-link locked" title="Generate daily grammar first">
                        <Lock size={14} /> Writing
                    </span>
                )}
            </div>
        </nav>
    );
}

export default Navbar;