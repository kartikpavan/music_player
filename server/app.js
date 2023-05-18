const express = require("express");
const cors = require("cors");
const app = express();

//Middlewares
app.use(cors());

// Routes
app.get("/", (req, res) => {
   res.status(200).json({ msg: "Hello from Root" });
});

const PORT = 3001;
app.listen(PORT, () => {
   console.log(`Litening on PORT : ${PORT}`);
});
