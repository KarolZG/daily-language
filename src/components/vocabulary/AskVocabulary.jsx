import { SendHorizonal } from "lucide-react";

function AskVocabulary({ onSubmit }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        if (!data.language || !data.subject) {
            console.warn("Please fill in both Language and Subject");
            return;
        }
        
        onSubmit(data);
    }

    return (
        <div className="vocabulary-wrapper">
            <form className="vocabulary-form" onSubmit={handleSubmit} autoComplete="off">
                <div className="vocabulary-inputs"> 
                    <select name="amount" className="vocabulary-select" defaultValue="10">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                    
                    <input
                        type="text"
                        name="language"
                        placeholder="Language (e.g. German)"
                        className="vocabulary-input"
                    />

                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject (e.g. Business Travel)"
                        className="vocabulary-input"
                    />

                    <button type="submit" className="vocabulary-submit-btn" title="Generate Vocabulary">
                        <SendHorizonal size={20} />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AskVocabulary;