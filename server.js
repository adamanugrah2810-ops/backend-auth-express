require("dotenv").config(); // <- tambahkan ini di paling atas
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
