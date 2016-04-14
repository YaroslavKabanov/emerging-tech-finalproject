var users = require('../../app/controllers/users.server.controller'),
    courses = require('../../app/controllers/courses.server.controller'),
    studentcourses = require('../../app/controllers/studentCourses.server.controller');

module.exports = function(app) {
    app.route('/api/courses/enrollment/:courseObjectId')
        .get(users.requiredLogin, users.isStaff, studentcourses.returnEnrollment)
    app.param('courseObjectId', studentcourses.enrollmentByCourseId);


    app.route('/api/students/enrollment/:studentObjectId')
        .get(users.requiredLogin, studentcourses.returnEnrollmentByStudentId)
    app.param('studentObjectId', studentcourses.enrollmentByStudentId);


    app.route('/api/records/:studentCourseId')
        .put(users.requiredLogin, users.isStaff, studentcourses.updateGrade)

    app.param('studentCourseId', studentcourses.recordByID);

};