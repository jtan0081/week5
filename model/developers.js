const mongoose = require('mongoose');
let developerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    level: {
        type: String,
        validate: {
            validator: function (levelValue) {
                return levelValue==="Beginner" || levelValue ==="Expert";
            },
            message: 'level should be Beginner or Expert'
        },
        required: true,
        // uppercase: true
    },
    address: {
        State:String,
        Suburb:String,
        Street:String,
        Unit:Number
    }
});
developerSchema.pre('save', function () {
    // capitalize
    this.level= this.level.toUpperCase();
  });
module.exports = mongoose.model('DeveloperCol', developerSchema);