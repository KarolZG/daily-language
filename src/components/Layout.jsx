import { Link } from 'react-router-dom';

function Layout({ children })
{
    return (
        <div className='app-wrapper'>
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Vocabulary</Link></li>
                        <li><Link to="/grammar">Grammar</Link></li>
                        <li><Link to="/writing">Writing</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                {children}
            </main>

            <footer>
                <em>Copyright</em> &#169; Karol Zuzda 2026 - CS50x Final Project
            </footer>
        </div>
    );
}

export default Layout;