const express = require("express");
const authMiddleware = require("../middlewares/auth");
const user = require("../models/user");

const router = express.Router();

router.use(authMiddleware);

router.get("/projects", (req, res) => {

    res.send({ ok: "true", })

})


module.exports = app => app.use("/projects", router)