const express = require('express');
const filmRoute = require("./routes/film")

const app = express();

const db = require('./model');
db.sequelize.sync({}).then(() => {
    console.log("Drop and re-sync db.");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // x-www-from-urlencoded -> body params

app.use((req, res, next) => {
    console.log("incoming req from", req.ip);
    next()
})

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    console.log("Incoming request from", req.ip);
    next()
});

app.use("/films", filmRoute);

app.use((req, res, next) => {
    console.log("Request End", req.ip);
    next()
});

app.use((req, res) => {
    res.status(404).send("<h1> Page Not Found</h1>");
});

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log("Server Listened on port ", PORT);
});