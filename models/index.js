var Quiz = require("./quiz");
exports.Quiz = Quiz;

const path = require('path');


//Load ORM
const Sequelize = require('sequelize');

//To use SQLite data base:
const sequelize = new Sequelize("sqlite:quiz.sqlite");

//Import the definition of the Quiz Table from quiz.js
sequelize.import(path.join(__dirname, 'quiz'));

//Create tables

sequelize.sync()
    .then(() => sequelize.models.quiz.count())
    .then(count => {
        if (!count){
            return sequelize.models.quiz.bulkCreate([
                {question: "Capital de Italia", answer: "Roma"},
                {question: "Capital de Francia", answer: "París"},
                {question: "Capital de España", answer: "Madrid"},
                {question: "Capital de Portugal", answer: "Lisboa"}
            ]);
        }
    })
    .catch(error => {
        console.log(error);
        process.exit(1);
    });

module.exports = sequelize;