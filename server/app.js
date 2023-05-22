require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");

//Middlewares
app.use(cors());

// Routes
app.get("/", (req, res) => {
   res.status(200).json({ msg: "Hello from Root" });
});

app.use("/api/users", authRoute);

const PORT = 3001;
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
