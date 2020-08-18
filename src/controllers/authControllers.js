const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const authConfig = require("../confing/auth.json")



const User = require("../models/user");


const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,

    });


}


router.post("/register", async (req, res) => {
    const { email } = req.body;
    try {
        // il faut refaire cette méthode
        if (await User.findOne({
            where: {
                email: email
            }
        }))
            return res.status(400).send("email déjà utiliser")


        const user = await User.create(req.body)
        User.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id })
        });

    } catch (error) {
        return res.status(400).send({ error: "Registration failed" })

    }
});



router.post("/authenticate", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: {
            email: email,
            password: password
        }
    })

    if (!user)
        return res.status(400).send({ error: "User not found" })

    if (await !bcrypt.compare(password, user.password))
        return res.status(400).send({ error: "invilide password" })

    user.password = undefined;


    return res.send({
        user,
        token: generateToken({ id: user.id })
    })

    // Création du token. puis creéation d'une méthode pour cela
    // const token = jwt.sign({ id: user.id }, authConfig.secret, {
    //     expiresIn: 86400,

    // })


});

module.exports = app => app.use("/auth", router)

