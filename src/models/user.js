const db = require("../batabase/db");
const bcrypt = require("bcrypt");


// Création de la table utilisateur
const user = db.sequelize.define("user", {
    nom: {
        type: db.Sequelize.STRING,
        required: true,

    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: db.Sequelize.STRING,
        required: true,
        select: false,
    },


});


user.beforeCreate((user, options) => {

    return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => {
            throw new Error();
        });
});


//Insertion des données dans bd
// user.create({
//     nom: "leonardo",
//     email: "leonardo.kabongo@mail.com",
// });

// cette function permet de créer la table mais attention!
//Il faut utiliser une seul fois au début
// user.sync({ force: true })

module.exports = user;