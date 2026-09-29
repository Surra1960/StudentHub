import { useEffect, useState } from "react";
import PracticeQuestions from "../components/PracticeQuestions";
import "../styles/Resources.css";

function Resources() {
    const [streams, setStreams] = useState([]);
    const [selectedStream, setSelectedStream] = useState("");

    const [programs, setPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState("");

    const [programYears, setProgramYears] = useState([]);
    const [selectedProgramYear, setSelectedProgramYear] = useState("");

    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState("");

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");

    const [resources, setResources] = useState([]);
    const [selectedResourceType, setSelectedResourceType] = useState("");

    const [resourcesLoading, setResourcesLoading] = useState(false);
    const [resourcesError, setResourcesError] = useState("");

    const resourceCategoryNames = {
        module: "Module",
        note: "Notes",
        midterm_exam: "Midterm Exams",
        final_exam: "Final Exams",
        practice: "Practice Questions"
    };

    useEffect(() => {
        fetch("http://localhost:4000/streams")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch streams");
                }

                return response.json();
            })
            .then((data) => {
                setStreams(data.streams);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        setSelectedProgram("");
        setSelectedProgramYear("");
        setSelectedSemester("");
        setSelectedCourse("");
        setSelectedResourceType("");

        setProgramYears([]);
        setSemesters([]);
        setCourses([]);
        setResources([]);

        if (!selectedStream) {
            setPrograms([]);
            return;
        }

        fetch(`http://localhost:4000/programs?stream_id=${selectedStream}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch programs");
                }

                return response.json();
            })
            .then((data) => {
                setPrograms(data.programs);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [selectedStream]);

    useEffect(() => {
        setSelectedProgramYear("");
        setSelectedSemester("");
        setSelectedCourse("");
        setSelectedResourceType("");

        setSemesters([]);
        setCourses([]);
        setResources([]);

        if (!selectedProgram) {
            setProgramYears([]);
            return;
        }

        fetch(`http://localhost:4000/program-years?program_id=${selectedProgram}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch program years");
                }

                return response.json();
            })
            .then((data) => {
                setProgramYears(data.programYears);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [selectedProgram]);

    useEffect(() => {
        setSelectedSemester("");
        setSelectedCourse("");
        setSelectedResourceType("");

        setCourses([]);
        setResources([]);

        if (!selectedProgramYear) {
            setSemesters([]);
            return;
        }

        fetch(
            `http://localhost:4000/semesters?program_year_id=${selectedProgramYear}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch semesters");
                }

                return response.json();
            })
            .then((data) => {
                setSemesters(data.semesters);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [selectedProgramYear]);

    useEffect(() => {
        setSelectedCourse("");
        setSelectedResourceType("");
        setResources([]);

        if (!selectedSemester) {
            setCourses([]);
            return;
        }

        fetch(`http://localhost:4000/courses?semester_id=${selectedSemester}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch courses");
                }

                return response.json();
            })
            .then((data) => {
                setCourses(data.courses);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [selectedSemester]);

    useEffect(() => {
        setSelectedResourceType("");
        setResourcesError("");

        if (!selectedCourse) {
            setResources([]);
            return;
        }

        setResourcesLoading(true);

        fetch(`http://localhost:4000/resources?course_id=${selectedCourse}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch resources");
                }

                return response.json();
            })
            .then((data) => {
                setResources(data.resources);
            })
            .catch((err) => {
                console.error(err);
                setResources([]);
                setResourcesError("Unable to load course resources.");
            })
            .finally(() => {
                setResourcesLoading(false);
            });
    }, [selectedCourse]);

    const getResourcesByType = (type) => {
        return resources.filter(
            (resource) => resource.resource_type === type
        );
    };

    const renderResourceCards = (type) => {
        const filteredResources = getResourcesByType(type);

        if (filteredResources.length === 0) {
            return (
                <p className="resource_empty">
                    No resources available in this category yet.
                </p>
            );
        }

        return filteredResources.map((resource) => (
            <div key={resource.id} className="resource_item">
                <h4>{resource.title}</h4>

                {resource.description && (
                    <p>{resource.description}</p>
                )}

                <a
                    href={resource.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Open Resource
                </a>
            </div>
        ));
    };

    const renderSelectedCategory = () => {
        if (!selectedResourceType) {
            return null;
        }

        return (
            <div className="resource_category">
                <h3>
                    {resourceCategoryNames[selectedResourceType]}
                </h3>

                {selectedResourceType === "practice" ? (
                    <PracticeQuestions chapterId={1} />
                ) : (
                    renderResourceCards(selectedResourceType)
                )}
            </div>
        );
    };

    return (
        <div className="page_content">
            <header className="page_heading">
                <h1>Resources</h1>

                <p>
                    Find academic resources and practice materials for your courses.
                </p>
            </header>

            <section className="resource_selection">
                <h2>Find Your Courses</h2>

                <div className="academic_selection">
                    <label htmlFor="stream">
                        Stream
                    </label>

                    <select
                        id="stream"
                        value={selectedStream}
                        onChange={(e) => setSelectedStream(e.target.value)}
                    >
                        <option value="">
                            Select your stream
                        </option>

                        {streams.map((stream) => (
                            <option
                                key={stream.id}
                                value={stream.id}
                            >
                                {stream.name}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedStream && (
                    <div className="academic_selection">
                        <label htmlFor="program">
                            Department
                        </label>

                        <select
                            id="program"
                            value={selectedProgram}
                            onChange={(e) => setSelectedProgram(e.target.value)}
                        >
                            <option value="">
                                Select your department
                            </option>

                            {programs.map((program) => (
                                <option
                                    key={program.id}
                                    value={program.id}
                                >
                                    {program.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedProgram && (
                    <div className="academic_selection">
                        <label htmlFor="programYear">
                            Academic Year
                        </label>

                        <select
                            id="programYear"
                            value={selectedProgramYear}
                            onChange={(e) =>
                                setSelectedProgramYear(e.target.value)
                            }
                        >
                            <option value="">
                                Select your academic year
                            </option>

                            {programYears.map((programYear) => (
                                <option
                                    key={programYear.id}
                                    value={programYear.id}
                                >
                                    Year {programYear.year_number}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedProgramYear && (
                    <div className="academic_selection">
                        <label htmlFor="semester">
                            Semester
                        </label>

                        <select
                            id="semester"
                            value={selectedSemester}
                            onChange={(e) =>
                                setSelectedSemester(e.target.value)
                            }
                        >
                            <option value="">
                                Select your semester
                            </option>

                            {semesters.map((semester) => (
                                <option
                                    key={semester.id}
                                    value={semester.id}
                                >
                                    Semester {semester.semester_number}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedSemester && (
                    <div className="academic_selection">
                        <label htmlFor="course">
                            Course
                        </label>

                        <select
                            id="course"
                            value={selectedCourse}
                            onChange={(e) =>
                                setSelectedCourse(e.target.value)
                            }
                        >
                            <option value="">
                                Select your course
                            </option>

                            {courses.map((course) => (
                                <option
                                    key={course.id}
                                    value={course.id}
                                >
                                    {course.code} - {course.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedCourse && (
                    <div className="resource_results">
                        <h2>Course Resources</h2>

                        {resourcesLoading && (
                            <p className="resource_empty">
                                Loading resources...
                            </p>
                        )}

                        {resourcesError && (
                            <p className="resource_empty">
                                {resourcesError}
                            </p>
                        )}

                        {!resourcesLoading && !resourcesError && (
                            <>
                                <div className="resource_categories">
                                    <button
                                        type="button"
                                        className={
                                            selectedResourceType === "module"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setSelectedResourceType("module")
                                        }
                                    >
                                        Module
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            selectedResourceType === "note"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setSelectedResourceType("note")
                                        }
                                    >
                                        Notes
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            selectedResourceType === "midterm_exam"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setSelectedResourceType("midterm_exam")
                                        }
                                    >
                                        Midterm Exams
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            selectedResourceType === "final_exam"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setSelectedResourceType("final_exam")
                                        }
                                    >
                                        Final Exams
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            selectedResourceType === "practice"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setSelectedResourceType("practice")
                                        }
                                    >
                                        Practice Questions
                                    </button>
                                </div>

                                {renderSelectedCategory()}
                            </>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Resources;