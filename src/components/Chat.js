import { InfoOutlined, StarBorderOutlined } from "@mui/icons-material";
import { doc, collection, orderBy } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { selectRoomId } from "../features/appSlice";
import { db } from "../firebase";
import ChatInput from "./ChatInput";
import Message from "./Message";

function Chat() {
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(roomId && doc(db, "rooms", roomId));
  const [roomMessages] = useCollection(
    roomId && collection(doc(db, "rooms", roomId), "messages")
  );
  return (
    <ChatContainer>
      <Header>
        <HeaderLeft>
          <h4>
            <strong>#{roomDetails?.data().name}</strong>
          </h4>
          <StarBorderOutlined />
        </HeaderLeft>
        <HeaderRigth>
          <p>
            <InfoOutlined /> Details{" "}
          </p>
        </HeaderRigth>
      </Header>
      <ChatMessages>
        {roomMessages?.docs.map((doc) => {
          const { message, timestamp, user, userImage } = doc.data();
          console.log(message);
          console.log(userImage);
          return (
            <Message
              key={doc.id}
              message={message}
              timestamp={timestamp}
              user={user}
              userImage={userImage}
            />
          );
        })}
      </ChatMessages>
      <ChatInput
        channelName={roomDetails?.data().name}
        channelId={roomId}
      ></ChatInput>
    </ChatContainer>
  );
}

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const ChatMessages = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const HeaderRigth = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;
