//SOCKET
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = [];

const addUser = (userId, socketId) => {
  console.log("user", users)
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
    console.log("add",users);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  console.log("remove",users);
};


const getUser = (receiversId) => {
  console.log("users", users);
  users.filter((user) => user.userId === receiversId)
  
  // return users.filter((user) => user.userId === receiversId);
};

// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };

//   when connect
io.on("connection", (socket) => {
  console.log("a user connected");

  // take id and socketid from a user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log("add2",users);
    io.emit("getUsers", users);
  });

//send and get message
  socket.on("sendMessage", ({ senderId, receiversId, text }) => {
    console.log("add3",users);
    const user = getUser(receiversId);
    console.log("userrr",user);
    // io.to(user.socketId).emit("getMessage", {
    //   senderId,
    //   text,
    // });
  });




  // //send and get message
  // socket.on("sendMessage", ({ senderId, receiverId, text }) => {
  //   const user = getUser(receiverId);
  //   io.to(user.socketId).emit("getMessage", {
  //     senderId,
  //     text,
  //   });
  // });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});