
const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const path = require('path');

// Configuration de notre server

const SERVER_PORT = process.env.PORT || 8080;
const SERVER_HOST = process.env.HOST || 'localhost';
const APP_ID = process.env.APP_ID || 'parse-server-test';
//Ceci doit rester secret
const MASTER_KEY = process.env.MASTER_KEY || 'F23xUQdRmQLQwxV5N6a32kqF8aPqISDV';
const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/parse-server-test';
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const DASHBOARD_AUTH = process.env.DASHBOARD_AUTH || 'parse:server';

const app = express();

//Configuration de parse Server
const parseServerAPI = new ParseServer({
    databaseURI: DATABASE_URI,
    cloud: path.resolve(__dirname, 'cloud.js'),
    appId: APP_ID,
    masterKey: MASTER_KEY,
    serverURL: `http://${SERVER_HOST}:${SERVER_PORT}/parse`
});


app.get("/", function (req, res) {
    res.end("IS_DEVELOPMENT => " + IS_DEVELOPMENT);
});

app.use('/parse', parseServerAPI);

app.listen(SERVER_PORT, () => console.log(
    `Notre serveur tourne en mode ${process.env.NODE_ENV || 'development'} sur http://localhost:${SERVER_PORT}`
));
