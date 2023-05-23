require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

//Middlewares
app.use(cors());
app.use(express.json()); // convert incoming form data into JSON formt

// Routes
app.get("/", (req, res) => {
   res.status(200).json({ msg: "Hello from Root" });
});

// user Auth Route
const authRoute = require("./routes/auth");
app.use("/api/users", authRoute);

// Artists Route
const artistRoute = require("./routes/artist");
app.use("/api/artists", artistRoute);

// Albums Route
const albumsRoute = require("./routes/albums");
app.use("/api/albums", albumsRoute);

// Songs Route
const songsRoute = require("./routes/songs");
app.use("/api/songs", songsRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
   console.log(`Litening on PORT : ${PORT}`);
});

// Connection to the Mongo DB database
async function start() {
   await mongoose.connect(process.env.MONGO_URI);
}
start()
   .then(() => console.log("Connection to MONGODB established Successully"))
   .catch((error) => console.log("connection to the DB failed" + error));
