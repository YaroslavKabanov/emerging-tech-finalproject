var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var courseSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    courseName: {
        type: String,
        default: '',
        trim: true,
        required: 'Course Name Cannot Be Blank'
    },
    courseCode: {
        type: String,
        default: '',
        trim: true,
        unique: true,
        required: 'Course Code Cannot Be Blank'
    },
    program: {
        type: String,
        default: '',
        trim: true,
        required: 'Program Name Cannot Be Blank'
    },
    description: String,
    enrollment: {
        student: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        grade: {
            default: 'N/A',
            type: String
        },
        editedBy: {
            type: Schema.ObjectId,
            ref: 'Staff'
        }
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'Staff'
    }
});

mongoose.model('Course', courseSchema);
//mongoose auto create collection name based on model name for you