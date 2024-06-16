const express = require('express');
const session = require('express-session');

const app = express();

app.use(
    session({
        // Since the signature depends on the 'secret', be careful if you change your secret,
        // all the cookies that were set previously will be invalid.
        secret: 'keyboardcat',

        // Set the cookie with the name 'basic-cookie-auth' in the browser. The default name is 'connect.sid'.
        name: 'basic-cookies-session',

        // Forces the session to be saved back to the session store, even if the session was never modified during the request.
        resave: false,

        // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
        saveUninitialized: false

        // By default, 'express-session' creates a new memory store instance for storing session data in server.
        // store: new session.MemoryStore(),

        // This option will not allow setting cookie in HTTP website.
        // cookie: { secure: true }

        // This option sets uid generation functions
        // genid: function(req) {}
    })
);

app.get('/', (req, res) => {
    // @req.sessionID - the session ID of the user.
    // sessionID is generated by 'uid-safe' library and stored in session store by default.
    // 'express-session' uses 'cookie-signature' library and your secret option to generate the value and sign the cookie.
    // @req.session - the session object.
    res.send('Hello world');
});

app.listen(3000);
