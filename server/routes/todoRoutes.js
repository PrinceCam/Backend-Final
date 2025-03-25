const express = require("express");
//const router = express.Router();
const Controller = require("../controller/controller");
const MiddleWare = require("../middleware/middleware");

module.exports = (app) => {
  app.post("/create", MiddleWare, Controller.create);

  app.get("/test", Controller.test);

  app.get("/gettodos", MiddleWare, Controller.gettodos);

  app.put("/edit/:id", MiddleWare, Controller.edit);

  app.delete("/delete/:id", MiddleWare, Controller.delete);
};
