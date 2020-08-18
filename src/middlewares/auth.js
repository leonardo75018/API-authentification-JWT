
const jwt = require("jsonwebtoken");
const authconfig = require("../confing/auth.json");
const { json } = require("body-parser");


module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: "No token provided"
        })
    }

    const parts = token.split(" ");

    if (!parts.length === 2)
        return res.status(401).send({ error: "token error" });


    const decode = jwt.verify(token, authconfig.secret);
    // res.send(decode)
    return next()



    // if (!authHeader)
    //     return res.status(401).send({ error: "no token provided" })

    // const parts = authHeader.split(" ");

    // if (!parts.length === 2)
    //     return res.status(401).send({ error: "token error" });

    // const [scheme, token] = parts;

    // if (!/^Bearer$^/i.test(scheme))
    //     return res.status(401).send({ erro: "Token malformated" });


    // jwt.verify(token, authconfig.secre, (err, decoded) => {
    //     if (err) return res.status(404).send({ err: "token invalid" })


    //     req.userId = decoded.id;
    //     return next()
    // })


};