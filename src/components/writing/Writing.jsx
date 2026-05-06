import WritingFeedback from "./WritingFeedback";
import WritingExercise from "./WritingExercise";

function Writing({ instruction, writing, setWriting, savedFeedback, onSumbit, isSubmitting }) {

    if (savedFeedback) {
        return (
            <WritingFeedback writing={writing} feedback={savedFeedback} />
        );
    }

    return (
        <WritingExercise 
            instruction={instruction}
            writing={writing}
            setWriting={setWriting}
            submitting={isSubmitting}
            handleSubmit={onSumbit}
        />
    );
}

export default Writing;