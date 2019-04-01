const express = require("express");
const router = express.Router();
var fs = require("fs");
var questionsFile = fs.readFileSync(__dirname+"/questions.json");
const questions = JSON.parse(questionsFile);

router.get("/question", (req, res) => {
    var max = Object.keys(questions).length-1;
    var min = 0;
    var idx = Math.floor(min + Math.random()*(max + 1 - min));
    res.send(questions[idx]);
    res.status(200);
}
);

module.exports = router;