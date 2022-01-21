import React from "react";
import Message from "../../components/Message/Message";


import "./chat.css"
export default function Chat({
 
  messages,
  scrollRef,
  user,
}) {
  return (
    <div className="chatBox">
        <div className="chatWrapper">
          <div className="chatBoxMiddle">
            {messages.map((m) => (
              <div ref={scrollRef}>
                <Message message={m} own={m.sender === user._id} />
              </div>
            ))}
          </div>
        </div>
        
    </div>
    )
}
