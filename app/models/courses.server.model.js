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
        trim:true,      
        required: 'Company Name Cannot Be Blank'
    },
    courseCode: {
        type: String,
        default: '',
        trim: true
    },
    program: {
        type: String,
        default: '',
        trim: true
    },
    description:String,
    creator: {
        type: Schema.ObjectId,
        ref: 'Staff'
    }
});

mongoose.model('Course', courseSchema);
//mongoose auto create collection name based on model name for you