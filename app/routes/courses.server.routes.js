var users = require('../../app/controllers/users.server.controller'),
    courses = require('../../app/controllers/courses.server.controller');

module.exports = function(app) {
  app.route('/api/courses')
     .get(courses.list)
     .post(users.requiresLogin, courses.create);
  
  app.route('/api/courses/:courseId')
     .get(courses.read)
     .put(users.requiresLogin, courses.hasAuthorization, courses.update)
     .delete(users.requiresLogin, courses.hasAuthorization, courses.delete);

  app.param('courseId', courses.courseByID);
};