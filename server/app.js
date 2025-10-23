import express from "express";

const app = express();
const port = 3000;

app.get("/", ({ res }) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
