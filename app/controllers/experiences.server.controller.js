var mongoose = require('mongoose'),
    Experience = mongoose.model('Experience');
    //mongoose auto create collection name based on model name for you

var getErrorMessage = function (err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                return err.errors[errName].message;
            } else {
                return 'Unknown server Error !';
            }
        }
    }
};

exports.create = function (req, res) {
    var experience = new Experience(req.body);
    experience.creator = req.user;

    var start = new Date(experience.startDate.replace("-", "/"));
    var end = new Date(experience.endDate.replace("-", "/"));

    if (start > end) {
        return res.status(400).send({
            message: "Start Date Should Be Before End Date"
        });
    } else {
        experience.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(experience);
            }
        });
    }
};

exports.list = function (req, res) {
    Experience.find().sort('-created').populate('creator', 'firstName lastName fullName')
        .exec(function (err, experience) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(experience);
            }
        });
};

exports.experienceByID = function (req, res, next, id) {
    Experience.findById(id).populate('creator', 'firstName lastName fullName')
        .exec(function (err, experience) {
            if (err) return next(err);
            if (!experience) return next(new Error('Failed to load experience' + id));
            req.experience = experience;
            next();
        });
};

exports.experienceByUserID = function (req, res, next, id) {
    Experience.find({ creator: id }).populate('creator', 'firstName lastName fullName')
        .exec(function (err, experience) {
            if (err) return next(err);
            if (!experience) return next(new Error('Failed to load experience' + id));
            req.experience = experience;
            next();
        });
};



exports.readMultiple = function (req, res) {

    if (req.message !== "User is not logged in") {
        if (req.experience.length !== 0) {
            var a = req.user._id;
            var b = req.experience[0].creator._id;

            if (a.toString() === b.toString()) {
                res.json(req.experience);
                //console.log(req.experience);
            }
            else {
                res.json({
                    message: 'User is not authorized'
                });
            }
        }
    } else {

    }




};

exports.read = function (req, res) {

    if (req.message !== "User is not logged in") {
        var a = req.user._id;
        var b = req.experience.creator._id;

        if (a.toString() === b.toString()) {
            res.json(req.experience);
            //console.log(req.experience);
        }
        else {
            res.json(new Experience());
        }
    } else {

        res.json({
            message: "User is not authorized"
        });
    }

};

exports.updates = function (req, res) {
    var experience = req.experience;
    experience.companyName = req.body.companyName;
    experience.city = req.body.city;
    experience.country = req.body.country;
    experience.startDate = req.body.startDate;
    experience.endDate = req.body.endDate;
    experience.position = req.body.position;
    experience.details = req.body.details;

    var start = new Date(experience.startDate.replace("-", "/"));
    var end = new Date(experience.endDate.replace("-", "/"));

    if (start > end) {
        return res.status(400).send({
            message: "Start Date Should Be Before End Date"
        });
    } else {
        experience.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(experience);
            }
        });
    }


};

exports.delete = function (req, res) {
    var experience = req.experience;
    experience.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(experience);
        }
    });
};


exports.hasAuthorization = function (req, res, next) {
    if (req.experience.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
}