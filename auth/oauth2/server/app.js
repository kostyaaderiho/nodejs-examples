const express = require('express');
const cors = require('cors');

require('dotenv').config();
const db = require('./database');

const setupGoogleAuth = require('./auth/middleware');
const routerGoogleAuth = require('./auth/router');
const routerApi = require('./api');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(setupGoogleAuth());

app.get('/', (req, res) => {
    res.json({
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
    });
});
app.use('/auth', routerGoogleAuth);
app.use('/api/v1', routerApi);

db();

app.listen(process.env.PORT, (req, res) =>
    console.log(`Server is running on ${process.env.PORT}`)
);
