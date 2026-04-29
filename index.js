const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const i18next = require("i18next")
const i18nextBE = require("i18next-fs-backend")
const i18nextMD = require("i18next-http-middleware")

const { add } = require("./helpers/math");
const app = express();
const port = process.env.PORT || 3000;
const connString = process.env.DB_CONNECTION_STR;
const bookRouter = require("./routes/books.routes");

//middlewares
app.use(i18nextMD.handle(i18next));
//i18next
i18next
    .use(i18nextBE)
    .use(i18nextMD.LanguageDetector)
    .init({
        fallbackLng: "en",
        backend: {
            loadPath: "./locales/{{lng}}.json"
        }
    });

app.use(express.json());
app.use("/books",bookRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


//console.log("Connection string:", connString);
//const connString = process.env.DB_CONNECTION_STR_TEST;
mongoose.connect(connString)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = app;
//  console.log("Welcome to the Inventory Management System!");