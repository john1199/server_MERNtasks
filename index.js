const express = require("express");
const conectarDB = require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const app = express();
conectarDB();

app.use(express.json());

app.use("/api/users", require("./routes/users"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));

app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});
