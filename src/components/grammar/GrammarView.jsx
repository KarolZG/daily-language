function GrammarView({ data }) {
    const { title, explanation, examples } = data;
    
    return (
        <div className='grammar-container'>
            <header className='grammar-header'>
                <span className='grammar-eyebrow'>Daily Grammar Concept</span>
                <h1 className='grammar-title'>{title}</h1>
            </header>

            <section className='grammar-explanation-section'>
                <div className='grammar-body-text'>
                    {explanation.split('\n\n').map((p, i) => (
                        <p key={i} className='grammar-paragraph'>{p}</p>
                    ))}
                </div>
            </section>

            <section className='grammar-examples-section'>
                <h3 className='grammar-sub-title'>Usage Examples</h3>
                <div className='grammar-examples-list'>
                    {examples.map((item, index) => (
                        <div key={index} className='grammar-example-item'>
                            <span className='grammar-example-number'>
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <p className='grammar-example-text'>{item.example}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default GrammarView;