const User = require('../models/User');

class UserController {
    async get(req, res) {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (err) {
            console.log('err', err);
        }
    }
}

module.exports = new UserController();
