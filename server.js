const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const ongkirRoutes = require("./routes/ongkir");
const resiRoutes = require("./routes/resi");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/ongkir", ongkirRoutes);
app.use("/resi", resiRoutes);
app.use("/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
