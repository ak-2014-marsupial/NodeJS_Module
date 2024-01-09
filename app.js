const express = require("express");
const {save,validatorEmail,validatorName,validatorAge}=require("./helper")

const app = express();

app.use(express.json());
const users = require("./db.json");

const PORT = 3000;


// Read
app.get("/users", (req, res) => {
    res.status(200).json(users);
})


app.get("/users/:id", (req, res) => {
    const {id} = req.params;
    const findId = users.find((item) => item.id === id);
    if (!findId) {
        res.status(400).send(`users with id:${id} not exist`)
    } else res.status(200).json(findId);
    res.status(200).json({
        data: ""
    })
})

//Create
app.post("/users", validatorAge, validatorName, validatorEmail, (req, res) => {
    const body = req.body;
    users.push(body);
    save(users);
    res.status(201).json({message: "User was created!"});
})

// Delete
app.delete("/users/:id", (req, res) => {
    const {id} = req.params;
    let result = users.filter((item) => item.id !== id);
    save(result);
    res.sendStatus(204);
})

// Update
app.put("/users/:id", validatorAge, validatorName, validatorEmail, (req, res) => {
    const body = req.body;
    const {id} = req.params;
    const result = users.map((item) => {
            if (item.id === id) {
                return body;
            } else {
                return  item

            }
        }
    )
    save(result);
    res.status(200).json({message: "User was updated!"});
})


app.listen(PORT, () => {
    console.log(`Server was started on port ${PORT}`)
})

