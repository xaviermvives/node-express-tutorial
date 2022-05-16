const express = require("express");
const shortId = require("shortid");

const server = express();

server.use(express.json());

const channels = [];
const lessons = [];

const PORT = 5000;

server.get("/", (req, res) => {
  //   res.send("Hello world!");
  res.json({ hello: "world" });
});

server.post("/api/channels", (req, res) => {
  const channelInfo = req.body;
  channelInfo.id = shortId.generate();
  channels.push(channelInfo);
  res.status(201).json(channelInfo);
});

server.get("/api/channels", (req, res) => {
  res.status(200).json(channels);
});

server.get("/api/lessons", (req, res) => {
  res.status(200).json(lessons);
});

server.post("/api/lessons", (req, res) => {
  const lessonInfo = req.body;
  lessonInfo.id = shortId.generate();
  lessons.push(lessonInfo);
  res.status(201).json(lessonInfo);
});

server.listen(PORT, () => {
  console.log(`\n*** Server running on htt://localhost:${PORT}`);
});
