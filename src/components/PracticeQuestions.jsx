import { useEffect, useState } from "react";
import { API_URL } from "../api";
import "../styles/PracticeQuestions.css";

function PracticeQuestions({ chapterId }) {
    const [chapter, setChapter] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [revealedAnswers, setRevealedAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!chapterId) {
            return;
        }

        setLoading(true);
        setError("");
        setAnswers({});
        setRevealedAnswers({});

        fetch(
            `${API_URL}/practice/chapters/${chapterId}/questions`
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

    const handleMatchingChange = (
        questionId,
        leftItemId,
        rightItemId
    ) => {
        setAnswers((previousAnswers) => ({
            ...previousAnswers,
            [questionId]: {
                ...(previousAnswers[questionId] || {}),
                [leftItemId]: rightItemId
            }
        }));
    };

    const handleRevealAnswer = async (questionId) => {
        if (revealedAnswers[questionId]) {
            setRevealedAnswers((previousAnswers) => {
                const updatedAnswers = { ...previousAnswers };
                delete updatedAnswers[questionId];

                return updatedAnswers;
            });

            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/practice/questions/${questionId}/answer`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch answer");
            }

            const data = await response.json();

            setRevealedAnswers((previousAnswers) => ({
                ...previousAnswers,
                [questionId]: data
            }));
        } catch (err) {
            console.error(err);
        }
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

                    <div className="practice_answer_area">
                        <button
                            type="button"
                            className="practice_answer_button"
                            onClick={() =>
                                handleRevealAnswer(question.id)
                            }
                        >
                            {revealedAnswers[question.id]
                                ? "Hide Answer"
                                : "View Answer"}
                        </button>

                        {revealedAnswers[question.id] && (
                            <div className="practice_answer">
                                {question.question_type ===
                                    "multiple_choice" && (
                                    <p>
                                        <strong>Answer:</strong>{" "}
                                        {
                                            revealedAnswers[question.id]
                                                .answer
                                        }
                                    </p>
                                )}

                                {question.question_type === "matching" && (
                                    <div>
                                        <strong>Answers:</strong>

                                        <ul>
                                            {revealedAnswers[
                                                question.id
                                            ].answer.map((pair, pairIndex) => (
                                                <li key={pairIndex}>
                                                    {pair.left} — {pair.right}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {revealedAnswers[question.id]
                                    .explanation && (
                                    <p>
                                        {
                                            revealedAnswers[question.id]
                                                .explanation
                                        }
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PracticeQuestions;
