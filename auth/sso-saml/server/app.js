require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { setupAuth, isUserAuthenticated } = require('./auth/middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(setupAuth());

app.get('/', isUserAuthenticated, (req, res) => res.send('Hello World!'));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
