import React from 'react'
import "./input.css";
export default function Input({setNewMessage, handleSubmit, newMessage}) {
    return (
        <div className="input">
            
            {/* input */}
            <textarea
               className="chatMessageInput"
               placeholder="write something..."
               onChange={(e) => setNewMessage(e.target.value)}
               value={newMessage}
             ></textarea>
             <button className="chatMessageSubmit" onClick={handleSubmit}>Send</button>
             {/* input */}
            
        </div>
    )
}
