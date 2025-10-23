import express from "express";

const app = express();
const port = 3000;

app.get("/", ({ res }) => {
  res.json({ message: "Hello from backend" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
