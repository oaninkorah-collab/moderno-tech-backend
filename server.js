const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// TEMP USERS (we'll move to database later)
const users = [
  {
    username: "admin",
    password: "admin123",
    role: "admin"
  }
];

// LOGIN ENDPOINT
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    username: user.username,
    role: user.role
  });
});

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Moderno Tech Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
