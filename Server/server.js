const io = require("socket.io")();
const { makeId } = require("./utils");

const clientRooms = {};

io.on("connection", (client) => {
  console.log("new connection");
  client.on("newGame", handleNewGame);
  client.on("joinGame", handleJoinGame);

  function handleJoinGame(roomName) {
    const room = io.sockets.adapter.rooms[roomName];

    let allUsers;
    if (room) {
      allUsers = room.sockets;
    }

    let numClients = 0;
    if (allUsers) {
      numClients = Object.keys(allUsers).length;
    }

    if (numClients === 0) {
      client.emit("unknownCode");
      return;
    } else if (numClients > 8) {
      client.emit("tooManyPlayers");
      return;
    }

    clientRooms[client.id] = roomName;

    client.join(roomName);
    client.number = numClients + 1;
    client.emit("init", numClients);

    console.log("a player joined" + ` player number ${client.number + 1}`);
  }

  function handleNewGame() {
    let roomName = makeId(5);
    if (roomName in Object.values(clientRooms)) {
      handleNewGame();
    }
    clientRooms[client.id] = roomName;
    client.emit("gameCode", roomName);

    client.join(roomName);
    client.number = 1;
    client.emit("init", 1);
    console.log("new game created");
  }
});
io.listen(8080);
