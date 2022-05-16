const express = require("express");
const shortId = require("shortid");

const server = express();

server.use(express.json());

let channels = [];
let lessons = [];

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

server.delete("/api/channels/:id", (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const deleted = channels.find((channel) => channel.id === id);
  // console.log(deleted);
  if (deleted) {
    channels = channels.filter((channel) => channel.id != id);
    res.status(200).json(deleted);
  } else {
    res
      .status(404)
      .json({ message: "Channel you are looking for does not exist" });
  }
});

server.delete("/api/lessons/:id", (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const deleted = lessons.find((lesson) => lesson.id === id);
  if (deleted) {
    lessons = lessons.filter((lesson) => lesson.id != id);
    res.status(200).json(deleted);
  } else {
    res
      .status(404)
      .json({ message: "Lesson you are looking fo does not exist" });
  }
});

server.get("/api/channels/:id", (req, res) => {
  const { id } = req.params;
  const oneChannel = channels.find((channel) => channel.id === id);
  if (oneChannel) {
    res.status(200).json(oneChannel);
  } else {
    res.status(404).json({ message: "Channel requested does no exist" });
  }
});

server.get("/api/lessons/:id", (req, res) => {
  const { id } = req.params;
  const oneLesson = lessons.find((lesson) => lesson.id === id);
  if (oneLesson) {
    res.status(200).json(oneLesson);
  } else {
    res.status(404).json({ message: "Lesson requested does not exist" });
  }
});

server.put("/api/channels/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  const index = channels.findIndex((channel) => channel.id === id);

  if (index != -1) {
    channels[index] = changes;
    res.status(200).json(channels[index]);
  } else {
    res.status(404).json({ message: "Channel requested does not exist" });
  }
});

server.listen(PORT, () => {
  console.log(`\n*** Server running on htt://localhost:${PORT}`);
});
