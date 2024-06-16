const { Schema, model } = require('mongoose');

const User = new Schema({
    fullName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    googleId: { type: String, required: true },
    picture: { type: String, required: true }
});

module.exports = model('Users_oauth2', User);
