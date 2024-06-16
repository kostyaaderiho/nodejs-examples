const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Role = require('../models/Role');
const config = require('../config');

const JWT_TOKEN_EXPIRATION_TIME_IN_SECONDS = 20;

class AuthController {
    static auth(candidate) {
        return jwt.sign(
            { data: { roles: candidate.roles, username: candidate.username } },
            config.secret,
            {
                expiresIn: JWT_TOKEN_EXPIRATION_TIME_IN_SECONDS
            }
        );
    }

    async registration(req, res) {
        try {
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });

            if (candidate) {
                res.status(400).json({
                    message: `Username ${username} already exists`
                });
            } else {
                const hash = bcrypt.hashSync(password, 7);
                const role = await Role.findOne({ value: 'USER' });
                const user = new User({
                    username,
                    password: hash,
                    roles: [role.value]
                });

                await user.save();

                res.status(200).json({
                    message: `User ${username} has been created`
                });
            }
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;

            const candidate = await User.findOne({ username });

            if (!candidate) {
                res.status(401).json({
                    message: `User ${username} does no exist`
                });
                return;
            }

            if (!bcrypt.compareSync(password, candidate.password)) {
                res.status(401).json({
                    message: 'The password or username is not correct'
                });
            }

            res.status(200).json({
                token: AuthController.auth(candidate)
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Login error' });
        }
    }
}

module.exports = new AuthController();
