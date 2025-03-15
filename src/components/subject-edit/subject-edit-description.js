import {Box, TextField} from "@mui/material";

function SubjectEditDescription(subject) {
    console.log(Object.keys(subject["subject"]))

    return (
        <Box
            component="form"
            className="subject-edit-component-description"
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" variant="outlined" defaultValue={subject["subject-description"]} />
        </Box>)
}

export default SubjectEditDescription;