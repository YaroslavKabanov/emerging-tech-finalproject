var mongoose = require('mongoose'),
    Course = mongoose.model('Course');

var getErrorMessage = function(err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Course already exists';
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

exports.create = function(req, res) {

    console.log(req.body);

    var course = new Course(req.body);
    course.creator = req.user;

    course.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(course);
        }
    });
};

exports.list = function(req, res) {
    Course.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, courses) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(courses);
        }
    });
};

exports.courseByID = function(req, res, next, id) {
    Course.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, course) {

        if (!course) return next(new Error('Failed to load Course details ' + id));

        req.course = course;
        next();
    });
};

exports.read = function(req, res) {
    res.json(req.course);
};

exports.update = function(req, res) {
    console.log(req.body);

    var course = req.course;
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.program = req.body.program;
    course.description = req.body.description;

    course.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(course);
        }
    });
};

exports.delete = function(req, res) {
    var course = req.course;

    course.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(course);
        }
    });
};

exports.hasAuthorization = function(req, res, next) {
    if (req.course.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};