const express = require("express");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



require("./controllers/authControllers")(app);
require("./controllers/ProjectControllers")(app);



app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})