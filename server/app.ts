import express from "express"; // todo add ts to server
import bcrypt from "bcrypt";
import { Sequelize, DataTypes } from "sequelize";
import { styleText } from 'node:util';

// todo fix this and add type in login
// import { LoginUser } from "../shared/auth"

const app = express();
const port = 3000;

app.use(express.json());

const DB_DATA = {
  HOST: "localhost",
  DB: "seerpg",
  NAME: "seerpg",
  PASSWORD: "seerpg",
};

const sequelize = new Sequelize(DB_DATA.DB, DB_DATA.NAME, DB_DATA.PASSWORD, {
  host: DB_DATA.HOST,
  dialect: "mysql",
});

const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }, // todo is stirng ok? also how long?
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log(styleText('green', 'Connection has been established successfully.'));
    // await sequelize.sync(); // make sure table exists
  } catch (error) {
    console.log(styleText('red', `Unable to connect to the database: ${error}`,));
  }
})();

// Endpoints
app.get("/", (req, res) => {
  res.json({ message: "Hello from backend" });
});

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      // todo add password with hashing on client-side(?)
    });

    res.status(201).json({ message: "Registered successfully", user: newUser });
    // todo add toast client side and redirect
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
    // todo add toast client side
  }
});

app.post("/forgot-password", (req, res) => {
  const user = req.body;
  res.status(200).json({ message: "Forgot password sent successfully", user });
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body; // or: const { email, password } = loginUser;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, (user as any).password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
