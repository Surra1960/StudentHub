import { useEffect, useState } from "react";

function PracticeQuestions({ chapterId }) {
    const [chapter, setChapter] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!chapterId) {
            return;
        }

        setLoading(true);
        setError("");
        setAnswers({});

        fetch(
            `http://localhost:4000/practice/chapters/${chapterId}/questions`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch practice questions");
                }

                return response.json();
            })
            .then((data) => {
                setChapter(data.chapter);
                setQuestions(data.questions);
            })
            .catch((err) => {
                console.error(err);
                setError("Unable to load practice questions.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [chapterId]);

    const handleMatchingChange = (questionId, leftItemId, rightItemId) => {
        setAnswers((previousAnswers) => ({
            ...previousAnswers,
            [questionId]: {
                ...(previousAnswers[questionId] || {}),
                [leftItemId]: rightItemId
            }
        }));
    };

    if (loading) {
        return (
            <p className="resource_empty">
                Loading practice questions...
            </p>
        );
    }

    if (error) {
        return (
            <p className="resource_empty">
                {error}
            </p>
        );
    }

    if (!chapter || questions.length === 0) {
        return (
            <p className="resource_empty">
                No practice questions available yet.
            </p>
        );
    }

    return (
        <div className="practice_questions">
            <div className="practice_heading">
                <h4>{chapter.title}</h4>

                {chapter.description && (
                    <p>{chapter.description}</p>
                )}
            </div>

            {questions.map((question, index) => (
                <div
                    key={question.id}
                    className="practice_question"
                >
                    <h5>
                        {index + 1}. {question.question_text}
                    </h5>

                    <span className="practice_points">
                        {question.points}{" "}
                        {question.points === 1 ? "point" : "points"}
                    </span>

                    {question.question_type === "multiple_choice" && (
                        <div className="practice_options">
                            {question.items.map((item) => (
                                <label
                                    key={item.id}
                                    className="practice_option"
                                >
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={item.id}
                                    />

                                    <span>{item.option_text}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {question.question_type === "matching" && (
                        <div className="practice_matching">
                            {question.items.leftItems.map((leftItem) => (
                                <div
                                    key={leftItem.id}
                                    className="matching_item"
                                >
                                    <span className="matching_term">
                                        {leftItem.text}
                                    </span>

                                    <select
                                        value={
                                            answers[question.id]?.[
                                                leftItem.id
                                            ] || ""
                                        }
                                        onChange={(e) =>
                                            handleMatchingChange(
                                                question.id,
                                                leftItem.id,
                                                Number(e.target.value)
                                            )
                                        }
                                    >
                                        <option value="">
                                            Select description
                                        </option>

                                        {question.items.rightItems.map(
                                            (rightItem) => (
                                                <option
                                                    key={rightItem.id}
                                                    value={rightItem.id}
                                                >
                                                    {rightItem.text}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PracticeQuestions;