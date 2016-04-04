var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Student = require('mongoose').model('Student');

module.exports = function () {
    passport.use(new LocalStrategy(function (username, password, done) {
        Student.findOne({
            studentNumber: username
        }, function (err, student) {
            if (err) {
                return done(err);
            }
            if (!student) {
                return done(null, false, {
                    message: 'Unknown Student'
                });
            }
            if (!student.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            
            return done(null, student);
        });
    }));
};