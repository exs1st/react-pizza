const jsonServer = require("json-server");
const app = jsonServer.create();
const path = require("path");
const express = require("express");
const middlewares = jsonServer.defaults();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const port = process.env.PORT || 3000;

app.use("/db", middlewares, router);
app.use(express.static(path.join(__dirname, "../build")));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
});
