// Correctly define the SubjectListComponent function with destructuring
function SubjectListComponent({
                                  subjectTitle,
                                  lecProf,
                                  labProf,
                                  skillList,
                                  semesterNumber,
                                  displaySemesterName = false
                              }) {

    let skillListTitles = skillList && skillList.length
        ? skillList.map((skill, index) => (
            `${skill["skill-name"]}${index + 1 !== skillList.length ? ', ' : ''}`
        )).join("")
        : "";

    return (
        <div className="subject-list-component">
            {displaySemesterName && <div className="subject-list-component-semesterName">{"semester " + semesterNumber}</div>}
            <div className="subject-list-component-box">
                <div className="subject-list-component-left-part">
                    <div className="subject-list-component-title">{subjectTitle}</div>
                    <div className="subject-list-component-skills">
                        {"Skills: " + skillListTitles}
                    </div>
                </div>
                <div className="subject-list-component-right-part">
                    {lecProf.length > 0 && <div className="subject-list-component-lec-prof-box">
                        <span>Lec.</span>
                        <span>{lecProf}</span>
                    </div>}
                    {labProf.length > 0 && <div className="subject-list-component-lab-prof-box">
                        <span>Lab.</span>
                        <span>{labProf}</span>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default SubjectListComponent;
