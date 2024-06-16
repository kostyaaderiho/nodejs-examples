const express = require('express');

const userRouter = require('./user/router');
const authRouter = require('./auth/router');
const auth = require('./middleware/auth');
const role = require('./middleware/role');
const db = require('./db');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', auth, role(['ADMIN']), userRouter);

function start() {
    try {
        db();

        app.listen(PORT, () =>
            console.log(`server is running, started on ${PORT} port`)
        );
    } catch (err) {
        console.error(err);
    }
}

start();
