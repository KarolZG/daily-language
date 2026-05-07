import { Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { formatFeedback } from "../../utils/textFormatter";

function WritingFeedback({ writing, feedback }) {
    return (
        <div className="feedback-container">
            <header className="feedback-header">
                <h2 className="feedback-main-title">Evaluation Results</h2>
            </header>

            {/* User writing*/}
            <section className="feedback-section original-draft">
                <span className="feedback-label">Your Original Draft</span>
                <div className="feedback-text-box">
                    <p>{writing}</p>
                </div>
            </section>

            {/* Version corrected by Gemini*/}
            <section className="feedback-section corrected-version">
                <div className="feedback-label-group">
                    <Sparkles size={16} className="icon-ai" />
                    <span className="feedback-label">Improved Version</span>
                </div>
                <div className="feedback-text-box polished">
                    <p>{formatFeedback(feedback.corrected_version)}</p>
                </div>
            </section>
            
            {/* Feeback section */}
            <div className="feedback-analysis-grid">
                <div className="analysis-card mistakes">
                    <div className="analysis-card-header">
                        <AlertCircle size={18} />
                        <h3>Mistakes Made</h3>
                    </div>
                    <p>{feedback.mistakes}</p>
                </div>

                <div className="analysis-card notes">
                    <div className="analysis-card-header">
                        <MessageSquare size={18} />
                        <h3>Overall Feedback</h3>
                    </div>
                    <p>{feedback.feedback}</p>
                </div>
            </div>
        </div>
    );
}

export default WritingFeedback;