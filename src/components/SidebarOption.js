import React from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";

function SidebarOption({ Icon, title, addChannelOption, id }) {
  const dispatch = useDispatch();
  const addChannel = async () => {
    const channelName = prompt("Please enter channel name");
    if (channelName) {
      let rooms = await collection(db, "rooms"); // returns a collection ref. ie. creates one if one does not exist.
      await addDoc(
        rooms,
        {
          name: channelName,
        },
        { merge: true }
      );
    }
  };
  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };
  return (
    <SidebarContainer onClick={addChannelOption ? addChannel : selectChannel}>
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarContainer>
  );
}

export default SidebarOption;

const SidebarContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }
  > h3 > span {
    padding: 15px;
  }
`;
const SidebarOptionChannel = styled.h3`
  padding: 10px;
  font-weight: 300;
`;
