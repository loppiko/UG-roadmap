import { useEffect, useState } from "react";
import SubjectListComponent from "../../components/subject-list-component";
import _ from "lodash";

function SubjectsList() {
    const [listOfSubjects, setListOfSubjects] = useState([]);

    // TODO add active filter () -> list.filter.map

    async function downloadSubjects() {
        try {
            const response = await fetch('http://localhost:8080/semester/subjects');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            let lastSemesterNumber = 0;

            const processedSubjects = data.map((subject, index) => {
                const displaySemesterName = lastSemesterNumber !== subject["semester"];

                if (displaySemesterName) {
                    lastSemesterNumber = subject["semester"];
                }

                return {
                    ...subject,
                    displaySemesterName,
                    key: `subject-list-item-${index}`
                };
            });

            const sortedSubjects = _.sortBy(processedSubjects, ['semester']);
            setListOfSubjects(sortedSubjects);
        } catch (error) {
            console.error('Failed to fetch subjects:', error);
        }
    }

    useEffect(() => {
        downloadSubjects();
    }, []);

    return (
        <div className="subject-list-container">
            <div className="subject-list-container-upper-part">
                <div className="subject-list-container-title">List of subjects</div>
                <div className="subject-list-container-user-logo">Logo</div>
            </div>
            <div className="subject-list-container-box">
                <div className="subject-list-container-box-list-header">List Header</div>
                {listOfSubjects && listOfSubjects.map((subject) => (
                    <SubjectListComponent
                        key={subject.key}
                        subjectTitle={subject["subject-name"]}
                        lecProf={subject["professor-lecture"]}
                        labProf={subject["professor-laboratories"]}
                        skillList={subject["skills"]}
                        displaySemesterName={subject["displaySemesterName"]}
                        semesterNumber={subject["semester"]}
                    />
                ))}
            </div>
        </div>
    );
}

export default SubjectsList;