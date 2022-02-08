require("dotenv").config();
require("./models/databaseInit");

const PORT = process.env.PORT;

const app = require("express")();
app.use(require("cors")());

const routes = require("./routes");
const server = require("http").Server(app);

app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("body-parser").json({ limit: "50mb" }));

app.use("/company/", routes.Company);
app.use("/transaction/", routes.Transaction);

// server.listen(PORT, () => console.log(`SoccerMASS:::listening on port ${PORT}`));
server.listen(PORT, () => console.log("Transearch", { listen: `on port ${PORT}` }));
