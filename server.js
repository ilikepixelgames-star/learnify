// server.js

const express = require('express');
const bodyParser = require('body-parser');

const { createAssignment, findAssignment } = require('./assignments');

const app = express();

app.use(bodyParser.json());


// CREATE ASSIGNMENT (teacher)
app.post('/create-assignment', (req, res) => {

    const { quizId, teacher } = req.body;

    const code = createAssignment(quizId, teacher);

    res.json({
        message: "Assignment created",
        code: code
    });

});


// JOIN ASSIGNMENT (student)
app.post('/join-assignment', (req, res) => {

    const { code } = req.body;

    const assignment = findAssignment(code);

    if (!assignment) {
        return res.json({
            error: "Assignment not found"
        });
    }

    res.json({
        quizId: assignment.quizId
    });

});


app.listen(5000, () => {
    console.log("Learnify server running on port 5000");
});
