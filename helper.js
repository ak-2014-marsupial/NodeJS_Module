const fs = require("fs");


const validatorEmail = (req, res, next) => {
    const email = req.body.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        next();
    } else {
        res.status(400).send("email is not valid");
    }
}

const validatorName = (req, res, next) => {
    const name = req.body.name;
    if (name.length >= 3 && name.length <= 20) {
        next();
    } else {
        res.status(400).send("name must be more than 3 and less 20 characters")
    }
}

const validatorAge = (req, res, next) => {
    const age = req.body.age;
    if (+age > 0 && +age < 120) {
        next();
    } else {
        res.status(400).send("age must be more than 0 and less 120")
    }
}

const save = (users) => {
    fs.writeFile("./db.json", JSON.stringify(users, null, 2), (error) => {
        if (error) {
            throw error;
        }
    });
}

module.exports={
    save,
    validatorAge,
    validatorName,
    validatorEmail
}