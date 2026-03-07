// server.js

const express = require('express');
const bodyParser = require('body-parser');

const { createAssignment, findAssignment } = require('./assignments');

const app = express();

app.use(bodyParser.json());


// ====== ORIGINAL LOBBY ======
app.get('/lobby', (req, res) => {
    res.send("Welcome to the Learnify Lobby! Play any quiz you want.");
});


// ====== TEACHER ASSIGNMENT SYSTEM ======

// Teacher creates an assignment
app.post('/create-assignment', (req, res) => {

    const { quizId, teacher } = req.body;

    if (!quizId || !teacher) {
        return res.json({ error: "quizId and teacher are required" });
    }

    const code = createAssignment(quizId, teacher);

    res.json({
        message: "Assignment created",
        code: code
    });
});


// Student joins assignment with code
app.post('/join-assignment', (req, res) => {

    const { code } = req.body;

    if (!code) {
        return res.json({ error: "Assignment code is required" });
    }

    const assignment = findAssignment(code);

    if (!assignment) {
        return res.json({ error: "Assignment not found" });
    }

    res.json({
        quizId: assignment.quizId
    });
});


// ====== OPTIONAL: HEALTH CHECK ======
app.get('/', (req, res) => {
    res.send("Learnify server is running!");
});


// ====== START SERVER ======
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Learnify server running on port ${PORT}`);
});
