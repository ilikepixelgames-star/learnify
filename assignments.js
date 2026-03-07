// assignments.js

const assignments = [];

// Create a new assignment
function createAssignment(quizId, teacherName) {

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const assignment = {
        code: code,
        quizId: quizId,
        teacher: teacherName,
        scores: []
    };

    assignments.push(assignment);

    return code;
}

// Find an assignment by code
function findAssignment(code) {
    return assignments.find(a => a.code === code);
}

module.exports = {
    createAssignment,
    findAssignment
};
