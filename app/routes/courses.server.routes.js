var users = require('../../app/controllers/users.server.controller'),
    courses = require('../../app/controllers/courses.server.controller'),
    studentcourses = require('../../app/controllers/studentCourses.server.controller');

module.exports = function(app) {
    app.route('/api/courses')
        .get(courses.list)
        .post(users.requiredLogin, users.isStaff, courses.create);

    app.route('/api/courses/:courseId')
        .get(courses.read)
        .put(users.requiredLogin, courses.hasAuthorization, courses.update)
        .delete(users.requiredLogin, courses.hasAuthorization, courses.delete);

    app.param('courseId', courses.courseByID);

    app.route('/api/students/courses')
        .get(users.requiredLogin, studentcourses.listCoursesByStudent)
        .post(users.requiredLogin, studentcourses.create);


    app.route('/api/students/courses/:enrollmentCourseId')
        .get(studentcourses.read)
        .delete(users.requiredLogin, studentcourses.drop);

    app.param('enrollmentCourseId', studentcourses.studentCoursesByCourseID);


    app.route('/api/classmate/courses/:sharedCourseId')
        .get(users.requiredLogin, studentcourses.returnClassmate);
    app.param('sharedCourseId', studentcourses.getClassmate);


    app.route('/api/staff/students/course/:theId')
        .get(users.requiredLogin, users.isStaff, studentcourses.returnStudents);
    app.param('theId', studentcourses.studentsByCourseID);

};