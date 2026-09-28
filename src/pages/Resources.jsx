import "../styles/Resources.css";
import { useState, useEffect } from "react";

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
    if (!selectedProgramYear) {
        setSemesters([]);
        return;
    }

    fetch(`http://localhost:4000/semesters?program_year_id=${selectedProgramYear}`)
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

                    <select id="stream" value={selectedStream} onChange={(e)=>setSelectedStream(e.target.value)}>
                        <option value="">Select your stream</option>
                        {
                            streams.map(stream=>(
                                <option value={stream.id} key={stream.id}>{stream.name}</option>
                            ))
                        }
                    </select>
                </div>
          {
    selectedStream && (
        <div className="academic_selection">
            <label htmlFor="program">
                Department
            </label>

            <select
                id="program"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
            >
                <option value="">Select your department</option>

                {
                    programs.map(program => (
                        <option key={program.id} value={program.id}>
                            {program.name}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

{
    selectedProgram && (
        <div className="academic_selection">
            <label htmlFor="programYear">
                Academic Year
            </label>

            <select
                id="programYear"
                value={selectedProgramYear}
                onChange={(e) => setSelectedProgramYear(e.target.value)}
            >
                <option value="">Select your academic year</option>

                {
                    programYears.map(programYear => (
                        <option
                            key={programYear.id}
                            value={programYear.id}
                        >
                            Year {programYear.year_number}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

{
    selectedProgramYear && (
        <div className="academic_selection">
            <label htmlFor="semester">
                Semester
            </label>

            <select
                id="semester"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
            >
                <option value="">Select your semester</option>

                {
                    semesters.map(semester => (
                        <option
                            key={semester.id}
                            value={semester.id}
                        >
                            Semester {semester.semester_number}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

{
    selectedSemester && (
        <div className="academic_selection">
            <label htmlFor="course">
                Course
            </label>

            <select
                id="course"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
            >
                <option value="">Select your course</option>

                {
                    courses.map(course => (
                        <option
                            key={course.id}
                            value={course.id}
                        >
                            {course.code} - {course.name}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}
            </section>

        </div>
    );
}

export default Resources;