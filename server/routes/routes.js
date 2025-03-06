const Controller = require("../controller/controller")
const MiddleWare = require("../middleware/middleware")
const express = require('express')


module.exports = (app) => {

    app.post("/register", Controller.register)

    app.post("/login",  Controller.login)

    app.get("/authCheck", Controller.authCheck)

    app.get("/test", Controller.test)

    app.get("/gettodos", MiddleWare, Controller.gettodos)

    app.post("/create", MiddleWare, Controller.create)

    app.delete("/delete/:id", MiddleWare, Controller.delete)

    app.put("/edit/:id", MiddleWare, Controller.edit)
}