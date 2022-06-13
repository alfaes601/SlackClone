import { Button } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, serverTimestamp, addDoc, collection } from "firebase/firestore";

function ChatInput({ chatRef, channelName, channelId }) {
  const [user, loading] = useAuthState(auth);
  const [input, setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!channelId) return false;

    const roomRef = doc(db, "rooms", channelId);
    const messagesRef = collection(roomRef, "messages");
    addDoc(messagesRef, {
      message: input,
      timestamp: serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });
    setInput("");
    chatRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="inputSubmit"
          placeholder={`Message #${channelName ? channelName : ""}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          Send
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  .inputSubmit {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }
  > form > button {
    display: none !important;
  }
`;
