
var students = require('../../app/controllers/students.server.controller'),
    passport = require('passport');

module.exports = function (app) {
    app.route('/signup')
        .get(students.renderSignup)
        .post(students.signup);
    app.route('/signin')
        .get(students.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));
    app.get('/signout', students.signout);

    
};