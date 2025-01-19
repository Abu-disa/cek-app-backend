const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const SECRET_KEY = "your_secret_key";

const AuthController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log;
      UserModel.createUser(username, hashedPassword, (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "Username already exists" });
          }
          return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json({ message: "User registered successfully" });
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  },

  login: (req, res) => {
    const { username, password } = req.body;

    UserModel.findByUsername(username, async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "Login successful", token });
    });
  },
};

module.exports = AuthController;
