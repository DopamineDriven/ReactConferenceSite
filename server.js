const express = require('express');
const next = require('next');

// instatiate local passport strategy
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const dev = process.env.NODE_ENV !== "production";
const app1 = next({ dev });
const handle = app1.getRequestHandler();
const PORT = process.env.PORT || 3000;

passport.use(
    new Strategy((username, password, done) => {
        const validateUser = (username, password) => {
            return username === password
        }

        return validateUser(username, password)
            ? done(null, { email: username })
            : done(false, false); //done...sends to serialize
    })
);

// serialize user
passport.serializeUser((userInfo, done) => {
    done(null, userInfo)
});

// deserialize user
passport.deserializeUser((userInfo, cb) => {
    cb(null, userInfo)
});


app1
    .prepare()
    .then(() => {
        const app = express();

        // install everything passport needs between server postbacks
        app.use(require("cookie-parser")());
        app.use(require('body-parser').urlencoded({ extended: true }));
        app.use(
            require("express-session")({
                secret: "keyboard cat",
                resave: false,
                saveUninitialized: false
            })
        );

        // initialize passport and restore authentication state, if any, from the session
        app.use(passport.initialize());
        app.use(passport.session());

        app.post(
            "/login",
            passport.authenticate("local", { failureRedirect: "/login" }),
            function(req, res) {
                res.redirect("/");
            }
        );
      
        app.get("/logout", (req, res) => {
            req.logout();
            res.redirect("/");
        });


        app.get("*", (request, response) => {
            return handle(request, response)
        });

        app.listen(PORT, error => {
            if (error) throw (error)
            console.log(`🌎 ==> API Server now listening on PORT http://localhost:${PORT}`)
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
});