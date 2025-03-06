const express = require("express");
const router = express.Router();
const Controller = require("../controller/controller");
const MiddleWare = require("../middleware/middleware");


router.get("/test", Controller.test);

router.get("/gettodos", MiddleWare, Controller.gettodos);

router.post("/create", MiddleWare, Controller.create);

router.delete("/delete/:id", MiddleWare, Controller.delete);

router.put("/edit/:id", MiddleWare, Controller.edit);

module.exports = router;
