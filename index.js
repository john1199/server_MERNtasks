const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const app = express();
conectarDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});
