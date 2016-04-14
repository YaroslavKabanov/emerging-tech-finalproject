var mongoose = require('mongoose'),
    StudentCourses = mongoose.model('StudentCourses'),
    Course = mongoose.model('Course'),
    User = mongoose.model('User');

var getErrorMessage = function(err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'you have already enrolled in the course';
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

    var studentCourses = new StudentCourses(req.body);

    studentCourses.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(studentCourses);
        }
    });
};


exports.listCoursesByStudent = function(req, res) {

    var courseID = new Array();
    StudentCourses.find({ student: req.user._id }).sort('-created')
        .exec(function(err, StudentCourses) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {


                for (var i = 0; i < StudentCourses.length; i++) {
                    courseID[i] = StudentCourses[i].course;
                }

                Course.find({
                    '_id': { $in: courseID }
                }).exec(function(err, courses) {
                    if (!courses) return next(new Error('Failed to load Course details ' + id));
                    //courses here
                    res.json(courses)
                });
            }
        })
};


exports.enrollmentByCourseId = function(req, res, next, id) {
    StudentCourses.find({ course: id }).sort("student").exec(function(err, enrollments) {
        if (err) return next(err);
        //if (!course) return next(new Error('Failed to load Course details ' + id));
        req.enrollmentByCourseId = enrollments;
        next();
    });
};

exports.enrollmentByStudentId = function(req, res, next, id) {
    StudentCourses.find({ student: id }).sort("student").exec(function(err, enrollments) {
        if (err) return next(err);
        //if (!course) return next(new Error('Failed to load Course details ' + id));        
        req.enrollmentByStudentId = enrollments;
        next();
    });
};

exports.returnEnrollment = function(req, res) {
    res.json(req.enrollmentByCourseId);
};

exports.returnEnrollmentByStudentId = function(req, res) {
    res.json(req.enrollmentByStudentId);
};


exports.studentCoursesByCourseID = function(req, res, next, id) {
    StudentCourses.findOne({ course: id, student: req.user._id }).exec(function(err, course) {
        if (err) return next(err);
        //if (!course) return next(new Error('Failed to load Course details ' + id));
        req.StudentCourses = course;
        next();
    });
};

exports.read = function(req, res) {
    res.json(req.StudentCourses);
};

exports.drop = function(req, res) {

    var studentCourse = req.StudentCourses;
    studentCourse.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(studentCourse);
        }
    });
};


exports.getClassmate = function(req, res, next, id) {
    var studentObjectId = new Array();
    StudentCourses.find({ course: id })
        .exec(function(err, classmateFromEnrollment) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                //find students real info here
                for (var i = 0; i < classmateFromEnrollment.length; i++) {
                    studentObjectId[i] = classmateFromEnrollment[i].student
                }

                User.find({
                    '_id': { $in: studentObjectId }
                }).exec(function(err, classmates) {
                    req.classmates = classmates;
                    next();
                });


            }
        })
};

exports.returnClassmate = function(req, res) {
    res.json(req.classmates);
};

exports.returnStudents = function(req, res) {
    res.json(req.students);
};

exports.studentsByCourseID = function(req, res, next, id) {
    StudentCourses.find({ course: id }).sort("student").exec(function(err, records) {
        if (err) return next(err);


        var arrayID = new Array();
        for (var i = 0; i < records.length; i++) {
            arrayID[i] = records[i].student;
        }

        console.log(arrayID);

        User.find({ '_id': { $in: arrayID } }).sort("_id").exec(function(err, students) {
            if (err) return next(err);
            req.students = students;
            next();

        });
    });
}

exports.updateGrade = function(req, res) {

    var studentCourse = req.record;
    studentCourse.grade = req.body.grade;
    studentCourse.editedBy = req.user._id;
    studentCourse.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(studentCourse);
        }
    });
};


exports.recordByID = function(req, res, next, id) {
    StudentCourses.findOne({ "_id": id }).exec(function(err, record) {
        if (err) return next(err);
        //if (!course) return next(new Error('Failed to load Course details ' + id));

        req.record = record;
        next();
    });
};

