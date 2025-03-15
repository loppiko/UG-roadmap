import { useEffect, useState } from "react";
import SubjectListComponent from "../../components/subject-list-component";
import _ from "lodash";
import SubjectEdit from "../../components/subject-edit/subject-edit";
import {apiGetRequest} from "../../internal/api/api-communication";

function SubjectsList() {
    const [listOfSubjects, setListOfSubjects] = useState([]);
    const [editData, setEditData] = useState({visible: false, subject: null});

    // TODO add active filter () -> list.filter.map

    async function downloadSubjects() {
        try {
            const data = await apiGetRequest("semester/subjects");
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
            {editData.visible && <SubjectEdit handleEditExit={() => setEditData({visible: false, subject: null}) } subject={editData.subject} />}
            <div className="subject-list-container-upper-part">
                <div className="subject-list-container-title">List of subjects</div>
                <div className="subject-list-container-user-logo">Logo</div>
            </div>
            <div className="subject-list-container-box">
                <div className="subject-list-container-box-list-header">List Header</div>
                {listOfSubjects && listOfSubjects.map((subject) => (
                    <SubjectListComponent
                        onClick={() => setEditData({ visible: true, subject: subject })}
                        subject={subject}
                        key={subject.key}
                        displaySemesterName={subject.displaySemesterName}
                    />
                ))}
            </div>
        </div>
    );
}

export default SubjectsList;