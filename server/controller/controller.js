const mongoose = require("mongoose")
const { Auth, Todo } = require('../model/model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

module.exports = {

    register: (req, res) => {
        console.log("Reg hit", req.body)

        Auth.findOne({ username: req.body.username })
            .then(found => {
                console.log("found", found)
                if (!found) {
                    console.log("Unique Username")
                    const hash = bcrypt.hashSync(req.body.password, 10)
                    console.log("HASH", hash)

                    const newUser = new Auth(
                        {
                            username: req.body.username,
                            password: hash
                        }
                    )
                    Auth.create(newUser)
                        .then(created => {
                            console.log("created", created)
                            res.status(201).json({ msg: "User registered successfully", created })
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json({ msg: "Error creating user", err })
                        })
                } else {
                    console.log("Username TAKEN")
                    res.status(409).json({ msg: "Username already taken" })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ msg: "Error checking username", err })
            })
    },

    login: (req, res) => {
        console.log("login", req.body)

        Auth.findOne({ username: req.body.username })
            .then(found => {
                console.log("found", found)
                if (!found) {
                    console.log("User not found")
                    return res.status(401).json({ msg: "User not found" })
                }

                if (bcrypt.compareSync(req.body.password, found.password)) {
                    console.log("Good Login")

                    const token = jwt.sign({ username: found.username, _id: found._id }, process.env.SECRET_KEY, {
                        expiresIn: '1h'
                    })
                    console.log("TOKEN", token)
                    res
                        .cookie("token", token, {
                            httpOnly: true,
                            maxAge: 3600000
                        })
                        .json({ msg: "good login", found })
                } else {
                    console.log("Bad Login")
                    res.status(401).json({ msg: "Bad LOGIN" })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ msg: "Error during login", err })
            })
    },

    authCheck: (req, res) => {
        console.log("AUTH CHECK", req.headers.cookie)
    },

    test: (req, res) => {
        console.log("Test HIT")
        res.json({ msg: "yup!" })
    },

    gettodos: (req, res) => {
        console.log("GetToDos HIT");
        Todo.find()
            .then(found => {
                console.log("found", found);
                res.json(found);
            })
            .catch(err => {
                console.log(`this is a ${err}`);
                res.status(500).json({ msg: "Error fetching todos", err });
            });
        },

    create: (req, res) => {
        console.log("CREATE HIT", req.body)
        Todo.create(req.body)
            .then(created => {
                console.log("created", created)
                res.json(created)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ msg: "Error creating todo", err })
            })
    },

    delete: (req, res) => {
        console.log("Delete HIT", req.params.id)
        Todo.findByIdAndDelete(req.params.id)
            .then(deleted => {
                console.log("deleted", deleted)
                res.json(deleted)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ msg: "Error deleting todo", err })
            })
    },

    edit: (req, res) => {
        console.log("Edit hit", req.params, req.body)
        Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(updated => {
                console.log("upD", updated)
                res.json(updated)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ msg: "Error updating todo", err })
            });
    }
}