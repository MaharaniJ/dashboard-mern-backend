const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv"); // Corrected dotenv import
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const clientRoutes = require('./routes/clientRoutes');
const generalRoutes = require("./routes/generalRoutes");
const managementRoutes = require("./routes/managementRoutes");
const salseRoutes = require("./routes/salseRoutes");

// Configuration
dotenv.config(); // Corrected dotenv configuration
const app = express();
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/managment", managementRoutes);
app.use("/salse", salseRoutes);

const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    app.listen(PORT, () => console.log(`server listening on ${PORT} and database connected successfully`));
  }).catch((error) => console.log(error));
