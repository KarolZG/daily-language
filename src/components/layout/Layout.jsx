import Navbar from './Navbar';

function Layout({ status, children })
{
    return (
        <div className='app-wrapper'>
            <header className='app-header'>
                <Navbar status={status}/>
            </header>

            <main className='app-content'>
                <div className='content-inner'>
                    {children}
                </div>
            </main>

            <footer className='app-footer'>
                <p>
                    <em>Copyright</em> &#169; Karol Zuzda 2026 — CS50x Final Project
                </p>
            </footer>
        </div>
    );
}

export default Layout;