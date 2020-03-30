const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== "production";
const app1 = next({ dev });
const handle = app1.getRequestHandler();
const PORT = process.env.PORT || 3000;
app1
    .prepare()
    .then(() => {
        const app = express();

        app.get("*", (request, response) => {
            return handle(request, response)
        });

        app.listen(PORT, error => {
            if (error) throw (error)
            console.log(`🌎 ==> API Server now listening on PORT http://localhost:${PORT}!`)
        })
    })