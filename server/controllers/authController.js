const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const registerUser = async (req, res) => {
    const { email, password ,publicKey } = req.body;
    console.log(req.body);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword , publicKey });
    await user.save();
    res.json({ message: "User registered" });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.json({ error: "Invalid credentials" }).status(401);
    }
    const token = generateToken(user);
    res.json({ token });
};

const protectedRoute = (req, res) => {
    res.json({ message: "Protected data", user: req.user });
};

module.exports = { registerUser, loginUser, protectedRoute };
