const jwt = require('jsonwebtoken')
const {Auth} = require("../model/model")

const middleware = (req, res, next) => {
    console.log("MiddleWare HITTTTTTTTT");
    console.log("AUTH CHECK", req.headers.cookie);
  
    if (!req.headers.cookie) {
      console.log("NO COOKIE");
      return res.status(401).json({ msg: "no cookie" });
    }
  
    try {
      const token = req.headers.cookie.split("=")[1];
      console.log("SPLIT", token);
  
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log("decoded", decoded);
  
      req.user = decoded;
      next();
    } catch (err) {
      console.log("JWT VERIFY ERROR", err);
      return res.status(401).json({ msg: "Invalid token" });
    }
  };

module.exports = middleware