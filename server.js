const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// USERS
const users = [
  { username: "admin", password: "admin123", role: "admin" }
];

// JOB STORAGE (temporary database)
let jobs = [];

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    u => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ username: user.username, role: user.role });
});

// SAVE JOB
app.post("/jobs", (req, res) => {
  const job = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  jobs.push(job);
  res.json(job);
});

// GET ALL JOBS
app.get("/jobs", (req, res) => {
  res.json(jobs);
});

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Moderno Tech Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
