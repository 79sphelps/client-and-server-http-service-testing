let mongoose = require('mongoose');
let UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 8
    },
    editable: {
        type: Boolean,
        required: true
    }
});

let User = mongoose.model("User", UserSchema);
module.exports = User;