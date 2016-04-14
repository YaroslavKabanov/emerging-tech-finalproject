var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var courseStudentSchema = new Schema({
    course: {
        type: Schema.ObjectId,
        ref: 'Course'
    },
    student: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    grade:{
        type: String,
        default: 'N/A',
    },
    editedBy:{
        type: Schema.ObjectId,
        ref: 'User'
    }
    


});

mongoose.model('StudentCourses', courseStudentSchema);
//mongoose auto create collection name based on model name for you