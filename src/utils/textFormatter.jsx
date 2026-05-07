// Function created to replace the HTML correction tags in writing feedback
// By green, bold text

export const formatFeedback = (text) => {
    if (!text) return "";

    // Regex expression to find HTML correction tag
    const parts = text.split(/(<correction>.*?<\/correction>)/g);

    return parts.map((part, index) => {
        if (part.startsWith("<correction>")) {
            const word = part.replace(/<\/?correction>/g, "");
            return (
                <span
                    key={index}
                    style={{
                        color: "green",
                        fontWeight: "bold",
                        fontStyle: "italic"
                    }}
                >
                    {word}
                </span>
            );
        }
        return part;
    });
};