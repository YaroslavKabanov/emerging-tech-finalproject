var Student = require('mongoose').model('Student'),//mongoose auto create collection name based on model name for you
    passport = require('passport');

var getErrorMessage = function (err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Student Number already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};

exports.renderSignin = function (req, res, next) {
    if (!req.user) {
        res.render('signin', {
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderSignup = function (req, res, next) {
    if (!req.user) {
        res.render('signup', {
            title: 'Sign-up Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

exports.signup = function (req, res, next) {
    if (!req.user) {
        var student = new Student(req.body);
        var message = null;

        student.provider = 'local';
        student.save(function (err) {
            if (err) {
                //console.log(err);
                message = getErrorMessage(err);

                req.flash('error', message);
                return res.redirect('/signup');
            }

            req.login(student, function (err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.signout = function (req, res) {
    req.logout();

    res.redirect('/');
};



exports.requiredLogin = function (req, res, next) {
    if (req.isAuthenticated() === false) {
        return res.status(401).send({
            message: 'User is not logged in'
        });

    }
    
    next();
};



