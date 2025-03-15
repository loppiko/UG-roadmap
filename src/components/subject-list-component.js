function SubjectListComponent({
                                  onClick,
                                  subject,
                                  displaySemesterName = false
                              }) {

    let skillListTitles = subject["skills"] && subject["skills"].length
        ? subject["skills"].map((skill, index) => (
            `${skill["skill-name"]}${index + 1 !== subject["skills"].length ? ', ' : ''}`
        )).join("")
        : "";

    return (
        <div className="subject-list-component" key={subject.key} onClick={onClick}>
            {displaySemesterName && <div className="subject-list-component-semesterName">{"semester " + subject["semester"]}</div>}
            <div className="subject-list-component-box">
                <div className="subject-list-component-left-part">
                    <div className="subject-list-component-title">{subject["subject-name"]}</div>
                    <div className="subject-list-component-skills">
                        {"Skills: " + skillListTitles}
                    </div>
                </div>
                <div className="subject-list-component-right-part">
                    {subject["professor-lecture"].length > 0 && <div className="subject-list-component-lec-prof-box">
                        <span>Lec.</span>
                        <span>{subject["professor-lecture"]}</span>
                    </div>}
                    {subject["professor-laboratories"].length > 0 && <div className="subject-list-component-lab-prof-box">
                        <span>Lab.</span>
                        <span>{subject["professor-laboratories"]}</span>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default SubjectListComponent;
