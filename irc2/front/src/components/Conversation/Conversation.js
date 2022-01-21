import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser, currentChat, setCurrentChat }) {
  const [users, setUsers] = useState([]);
const [active, setActive] = useState(false);
const [modal, setModal] = useState(false);

useEffect(() => {
  // console.log("currentchat",currentChat);
  // console.log("conversation", conversation);
  if(currentChat == conversation){
    setActive(true);
  }else{
    setActive(false);
  }
},[currentChat])



useEffect(() => {
  
  const friendsId = conversation.members.filter((member) => member !== currentUser._id);
  // console.log("friendsId",friendsId);

  const getUser = async () => {
      try {
        const res = await axios.post
        ("http://localhost:8080/api/users/users",friendsId);
        // console.log("res",res.data);
        setUsers(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    getUser();  
},[])

// useEffect(()=>{
//   console.log("users",users);
// },[users])


//   useEffect(() => {
//     // const friendsId = conversation.members.find((member) => member !== currentUser._id);
// // console.log("friendsId",friendsId);
//     // const getUser = async () => {
//     //   try {
//     //     const res = await axios("http://localhost:8080/api/users?userId=" + friendId);
//     //     setUser(res.data);
//     //   } catch (err) {
//     //     console.log(err);
//     //   }
//     // };
//     // getUser();
//   }, [currentUser, conversation]);

 //fonction qui envoie un message
 const handleDeleteConv = async (e) => {
  e.preventDefault();
  e.stopPropagation();
  try {
    const res = await axios.delete(
      `http://localhost:8080/api/conversation/${conversation._id}`
    );
    // console.log(res);
    setCurrentChat(null);
    // console.log(currentChat);
  } catch (err) {
    console.log(err);
  }
};
  
  return (
    <div className={active?"conversation active": "conversation"}>
        <div className="convName">{users.map((user)=> <p>{user.username}</p>)}</div>
        <button className="deleteButton" onClick={()=>setModal(true)}>delete</button>
        {modal?
         <div className="modalDelete" onClick={()=>{setModal(false); return null;}}>
           <div className="modalBox">
             <h2>Delete</h2>
           <p> Etes vous sur de vouloir suprimer cette conversation</p>
           <div className="modalBtn">
           <button className="" onClick={()=>{setModal(false); return null;}}>non</button>
           <button className="deleteBtn" onClick={handleDeleteConv}>oui</button>
           </div>
           
          </div>
         
       </div>
        :null}
       
       
    </div>
  );
}
