import {useEffect, useRef, useState} from "react";
import TabList from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SubjectEditDescription from "./subject-edit-description";
import SubjectEditSkills from "./subject-edit-skills";
import SubjectEditOther from "./subject-edit-other";

function SubjectEdit({handleEditExit, subject}) {
    const subjectEditReference = useRef(null);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (subjectEditReference.current && !subjectEditReference.current.contains(event.target)) {
                handleEditExit();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    })

    return (
        <div className="subject-edit" ref={subjectEditReference}>
            <div className="subject-edit-upper-panel">
                <div className="subject-edit-upper-panel-left-side">
                    <div className="subject-edit-upper-panel-title">{subject["subject-name"]}</div>
                    <div className="subject-edit-upper-panel-title">{`Semester ${subject["semester"]}`}</div>
                </div>
                <div className="subject-edit-upper-panel-right-side">
                    <div className="subject-edit-upper-panel-right-side-save">Save</div>
                    <div className="subject-edit-upper-panel-right-side-exit">Exit</div>
                </div>
            </div>
            <TabList value={activeTab} onChange={(_, value) => setActiveTab(value)} className="subject-edit-tabs">
                <Tab className="subject-edit-tabs-description" label={"Description"}></Tab>
                <Tab className="subject-edit-tabs-skills" label={"Skills"}></Tab>
                <Tab className="subject-edit-tabs-other" label={"Other"}></Tab>
            </TabList>
            {(activeTab === 0) && <SubjectEditDescription subject={subject} />}
            {(activeTab === 1) && <SubjectEditSkills />}
            {(activeTab === 2) && <SubjectEditOther />}
            <div className="subject-edit"></div>
        </div>
    )
}

export default SubjectEdit;