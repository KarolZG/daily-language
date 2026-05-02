function AskVocabulary({ onSubmit })
{
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="vocab-amount">Choose an amount:</label>
                <select name="amount" id="vocab-amount">
                    <option value="">Amount</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
                
                <label htmlFor="vocab-lang">Language:</label>
                <input type="text" name="language" id="vocab-lang" />

                <label htmlFor="vocab-subject">Subject:</label>
                <input type="text" name="subject" id="vocab-subject"/>

                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default AskVocabulary;