const express = require("express");
const app = express();
const router = require("./routes/routes.js");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({extended:false}));

//statische Inhalte
app.use(express.static("public"));

app.use(router);

app.listen(8020, function(){
    console.log("Ich lausche auf http://localhost:8020");
});