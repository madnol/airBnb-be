const express = require("express");
const placesRoute = require("./routes/places.js");

require("dotenv").config();

server = express();

server.use(express.json());

const PORT = process.env.PORT || 5001;

server.use("/places", placesRoute);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/* The only req that browsers can make it's a GET */
