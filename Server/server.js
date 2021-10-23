const io = require("socket.io")();
const { makeId } = require("./utils");

io.on("connection", (client) => {
  client.emit("test", "hi");
});
io.listen(8080);
