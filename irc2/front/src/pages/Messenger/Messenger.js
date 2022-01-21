import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./messenger.css";
import Conversation from "../../components/Conversation/Conversation";
import Infobar from "../../components/Infobar/Infobar";
import { io } from "socket.io-client";
import Chat from "../../components/Chat/Chat";
import Input from "../../components/Input/Input";
import CreateConv from "../../components/Createconv/CreateConv";
export default function Messenger() {
  //le user connecter
  const { user } = useContext(AuthContext);
  //nouveau message envoyé
  const [newMessage, setNewMessage] = useState("");
  //toute les conversation d'un user
  const [conversations, setConversations] = useState([]);
  //conversation ouverte
  const [currentChat, setCurrentChat] = useState(null);
  //tous les messages
  const [messages, setMessages] = useState([]);
  //SOCKET le message qui arrive avec get message socket
  const [arrivalMessage, setArrivalMessage] = useState(null);
  //SOCKET tous les personnes dans le socket
  const [OnlineUsers, setOnlineUsers] = useState([]);
  // la connection au socket
  const socket = useRef();
  // le dernier message envoyé
  const scrollRef = useRef();
 
  //SOCKET
  useEffect(() => {
    //on connection
    socket.current = io("ws://localhost:8900");
    console.log(socket);

    // on ajoute le message envoyé dans arrivalmessage
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  //SOCKET ajoute un user dans le socket
  useEffect(() => {
    // des que le user change ca l'ajoute dans les user connecter
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log("allusers",users);
    });
  }, [user]);

  //BDD On recupere les messages en bdd
  useEffect(() => {
    //BDD on recupere tous les messages d'une conversation et on les met dans messages
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  //fonction qui envoie un message
  const handleSubmit = async (e) => {
    e.preventDefault();
    //BDD on ajoute le nouveau message en bdd et dans le tableau de messages
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/messages",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }

    //SOCKET receiverid = currentchat.Members ! userid
      const receiversId = currentChat.members.filter(member => member !== user._id );

      //SOCKET emit le newmessage
        socket.current.emit("sendMessage", {
          senderId: user._id,
          receiversId,
          text: newMessage,
        });
  };
  
  //je ne sais pas ce que ca fais
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  
  

  useEffect(() => {
    //BDD on recupere tous les conversation d'un user et les met dans conversations
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/conversation/" + user._id
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id,currentChat]);
  //, conversations, currentChat

  //on descend vers le dernier message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 

  return (
    <div className="messengerPage">

      <div className="messengerLeft">
        <div className="titleleft">
          <h1>{user.username} Account</h1>
        </div>
        <div className="userWrapper">
          <div className="titleUser">
            <h3>Create a conversation</h3>
            <CreateConv currentUser={user}/>
          </div>
        </div>
        <div className="conversationsWrapper">
          <div className="titleConversation">
            <h3>All conversations</h3>
          </div>
          {conversations.map((conversation) => (
            <div
              className="conversationWrapper"
              onClick={() => setCurrentChat(conversation)}
            >
              <Conversation
                setCurrentChat={setCurrentChat}
                currentChat={currentChat}
                key={conversation._id}
                conversation={conversation}
                currentUser={user}
              />
            </div>
          ))}
        </div>
      </div>









      <div className="messengerMiddle">
        {currentChat ? (
          <div>
            <Infobar currentChat={currentChat} />
            <Chat
              messages={messages}
              scrollRef={scrollRef}
              user={user}
              setNewMessage={setNewMessage}
              newMessage={newMessage}
              handleSubmit={handleSubmit}
            />

            <Input
              setNewMessage={setNewMessage}
              newMessage={newMessage}
              handleSubmit={handleSubmit}
            />
          </div>
        ) : (
          <div className="noConversationText">
            <span>Open a conversation to start a chat.</span>
          </div>
        )}
      </div>
    </div>
  );
}
