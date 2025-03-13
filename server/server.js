const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Kafka } = require('kafkajs')
require("dotenv").config();

const app = express();
const port = 5000;
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json())

const kafka = new Kafka({ clientId: 'chat-app', brokers: ['localhost:9092'] })
const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'chat-group' })

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));

// User Schema & Model
const userSchema = new mongoose.Schema({ email: String, password: String });
const User = mongoose.model("User", userSchema);

// Generate JWT Token
const generateToken = (user) => jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

// Register User
app.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.json({ message: "User registered" });
});

// Login User
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ token });
});

// Middleware to Verify Token
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(400).json({ error: "Invalid token" });
    }
};

// Protected Route
app.get("/protected", authMiddleware, (req, res) => {
    res.json({ message: "Protected data", user: req.user });
});

app.post('/send-message', async (req, res) => {
    const { to, message } = req.body
    await producer.connect()
    await producer.send({
      topic: to,
      messages: [{ value: message }]
    })
    res.json({ status: 'Message sent' })
  })
  
  app.get('/receive-messages/:userId', async (req, res) => {
    const { userId } = req.params
    await consumer.connect()
    await consumer.subscribe({ topic: userId, fromBeginning: true })
    const messages = []
    await consumer.run({
      eachMessage: async ({ message }) => {
        messages.push(message.value.toString())
      }
    })
    res.json({ messages })
  })

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
