const express = require("express");

const server = express();

const PORT = 5000;

server.get("/", (req, res) => {
  //   res.send("Hello world!");
  res.json({ hello: "world" });
});

server.listen(PORT, () => {
  console.log(`\n*** Server running on htt://localhost:${PORT}`);
});
