var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var StaffSchema = new Schema({
    staffId: {
        type: String,
        unique: true,
        required: 'Student Number is required',
        trim: true
    },
    password: {
        type: String,
        validate: [
            function (password) {
                return password && password.length > 6;
            }, 'Password should be longer'
        ]
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,        
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

StaffSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

StaffSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

StaffSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

StaffSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};


StaffSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('Staff', StaffSchema);
//mongoose auto create collection name based on model name for you