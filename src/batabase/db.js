const Sequelize = require("sequelize");

//Connection avec la bd
const sequelize = new Sequelize("auth", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    port: 8889,
});


// Vérification de la connection
sequelize
    .authenticate()
    .then(function () {
        console.log("connection avec la bd réuissite");
    })
    .catch(function (err) {
        console.log("Error de connection avec la bd" + " " + err);
    });


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}