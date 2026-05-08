// Loading spinner and error message when the 3 api calls fail

export const dataLoader = ( loadingStatus, data, section ) => {
        if (loadingStatus) return (
        <div className="loading-container">
            <div className="gemini-loader"></div>
            <p>Fetching Daily {section}</p>
        </div>
    );

    if (!data) return <p className="error-text">Daily {section} load failed. Please refresh the page to try again.</p>;

};