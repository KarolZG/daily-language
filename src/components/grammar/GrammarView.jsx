function GrammarView({ data }) {
    const { title, explanation, examples } = data;
    return (
        <div className='grammar-section'>
            <h1>Daily Grammar</h1>
            <h2>Subject: {title}</h2>
            <div id="grammar-explanation">
                {explanation.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <br></br>
            <h2>Examples:</h2>
            <ol>
                {examples.map((item, index) => <li key={index}>{item.example}</li>)}
            </ol>
        </div>
    );
}

export default GrammarView;