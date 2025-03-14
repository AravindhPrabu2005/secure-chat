const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB().then(() => {
    app.use("/api", authRoutes);
    app.use("/api", userRoutes);

    const port = 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch((err) => {
    console.log("Error while connecting DB:", err.message);
});
