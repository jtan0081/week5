const mongoose = require('mongoose');
let taskSchema = mongoose.Schema({
    Taskname: String,
    Assignto: {
        type:String
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'DeveloperCol'
    },
    Duedate: {
        type: Date
        // default: Date.now
    },
    TaskStatus: {
        type: String,
        validate: {
            validator: function (statusValue) {
                return statusValue === "InProgress" || statusValue === "Complete";
            },
            message: 'Task status should be InProgress or Cmpolete'
        },
        required: true
    },
    TaskDescription: String

});
module.exports = mongoose.model('TaskCol', taskSchema);