var mongoose = require('mongoose'),
Course = mongoose.model('Course');

var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

exports.create = function(req, res) {
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
    if (err) return next(err);
    if (!course) return next(new Error('Failed to load Course details ' + id));

    req.course = course;
    next();
  });
};

exports.read = function(req, res) {
  res.json(req.course);
};

exports.update = function(req, res) {
  var course = req.course;
console.log(req.body.coursecode);
console.log(req.body.coursename);
  course.coursecode = req.body.coursecode;
  course.coursename = req.body.coursename;
  course.section = req.body.section;
  course.semester = req.body.semester;

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