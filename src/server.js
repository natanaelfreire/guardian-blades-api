"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = express_1["default"]();
var port = 3333;
app.get('/', function (req, res) {
    res.send('Hello server.ts');
});
app.listen(port, function (err) {
    if (err) {
        return console.error(err);
    }
    return console.log("server is listening on http://localhost:" + port);
});
