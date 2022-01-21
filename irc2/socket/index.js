const io = require("socket.io")(8900, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],

    },
  });
  
  var users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (receiversId) => {
    return users.filter(user => receiversId.includes(user.userId));
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
    
    //send and get message
    socket.on("sendMessage", ({ senderId, receiversId, text }) => {
        console.log(receiversId);

      const receiveusers = getUser(receiversId);
      console.log("rec",receiveusers);

      receiveusers.forEach((item) => {
        io.to(item.socketId).emit("getMessage", {
            senderId,
            text,
          });
      })
     
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });