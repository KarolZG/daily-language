import Navbar from './Navbar';

function Layout({ status, children })
{
    return (
        <div className='app-wrapper'>
            <header>
                    <Navbar status={status}/>
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