import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", ({ res }) => {
  res.json({ message: "Hello from backend" });
});

const users = []; // Testing implementation

app.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (users.find((u) => u.username === username)) {
    return res.status(409).json({ error: "Username already exists" });
  }

  const user = { username, email };
  users.push({ ...user, password });
  res.status(201).json({ message: "Registered successfully", user });
});

app.post("/forgot-password", (req, res) => {
  const user = req.body;
  res.status(200).json({ message: "Forgot password sent successfully", user });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
