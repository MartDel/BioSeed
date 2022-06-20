const express = require('express');
const path = require('path');

const config = require('./config.json');

const app = express();
app.engine('.ejs', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (_req, res) => {
    res.render('index');
});

app.get(config.http.favicons, (req, res) => {
    const file = req.path.substring(1); 
    res.sendFile(path.join(__dirname, 'public', 'favicons', file));
});

app.listen(config.http.port, () => console.log("BioSeed server is listening on port", config.http.port));