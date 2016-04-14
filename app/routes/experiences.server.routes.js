/*
var students = require('../../app/controllers/students.server.controller'),
    experiences = require('../../app/controllers/experiences.server.controller');

module.exports = function (app) {

    app.route('/api/experiences')
        .get(experiences.list)
        .post(students.requiredLogin, experiences.create);

    app.route('/api/experiences/:experienceId')
        .get(students.requiredLogin,experiences.read)
        .put(students.requiredLogin, experiences.hasAuthorization, experiences.updates)
        .delete(students.requiredLogin, experiences.hasAuthorization, experiences.delete);

    app.param('experienceId', experiences.experienceByID);


    app.route('/api/experiences/student/:Id')
        .get(students.requiredLogin, experiences.readMultiple)

    app.param('Id', experiences.experienceByUserID);

};
*/