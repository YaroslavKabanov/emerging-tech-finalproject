var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);

    require('../app/models/students.server.model');
    require('../app/models/experiences.server.model');

    return db;
}