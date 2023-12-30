const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./api/routes/products");

mongoose.set('strictQuery', false);

app.get("/", (req, res) => {
    res.json([{
        message: 'Listening on port: ' + process.env.PORT + process.env.ENV + ' is deployed successfully.'
    }])
})

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
}));


//mongoose.connect("mongodb+srv://my-rest-api:" + process.env.MONGO_ATLAS_PW + "@my-rest-api.9nx2ruj.mongodb.net/");
const dblink = process.env.DBSTART + process.env.MONGO_ATLAS_PW + process.env.DBEND;
mongoose.connect(dblink);


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/products", productRoutes);

app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status = err.status || 500;
    res.json({
        message: err.message
    })
});


module.exports = app;