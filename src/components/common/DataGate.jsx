import { AlertTriangle, RefreshCw } from "lucide-react";

// Server request validation
const DataGate = ({ loading, data, section, allowEmpty=false, children }) => {
    // Loading spinner
    if (loading) {
        return (
            <div className="loading-container">
                <div className="gemini-loader"></div>
                <p>Fetching Daily {section}</p>
            </div>
        );
    }
    // Error message if api call fails
    if (!allowEmpty && (!data || Object.keys(data).length === 0))
    {
        return (
            <div className="error-box">
                <div className="error-icon-wrapper">
                    <AlertTriangle size={24} />
                </div>
                <div className="error-content">
                    <h3 className="error-title">Content Unavailable</h3>
                    <p className="error-message">
                        We couldn't load your Daily {section}.
                    </p>
                    <div className="error-actions">
                        <button className="error-retry-btn" onClick={() => window.location.reload()}>
                            <RefreshCw size={14} />
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    // Page content when response is ok
    return children;
};

export default DataGate;