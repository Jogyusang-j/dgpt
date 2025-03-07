import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { MessageIcon, PinIcon } from "../../assets";
import { ALL, PINNED } from "../../utils.js";
import { PlusSign } from "../../assets/icons";

const SideMenu = ({
  menuSelected,
  setMenuSelected,
  setSelectedThread,
  handleNavigation,
}: any) => {
  const [isHoveredPinned, setIsHoveredPinned] = useState(false);
  const [isHoveredMessage, setIsHoveredMessage] = useState(false);
  const handleMenuClick = (menuType: string) => {
    setMenuSelected(menuSelected === menuType ? "" : menuType);
  };

  return (
    <div
      style={{
        width: "84px",
        height: "calc(100% - 93px)",
        alignItems: "center",
        borderRadius: "16px",
        padding: "10px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
        justifyContent: "space-between",
        boxShadow: "0px 4px 4px 0px #2023261A", // Softer bottom shadow
      }}
    >
      <div>
        <div
          style={{
            background:
              menuSelected === PINNED || isHoveredPinned ? "#CDD6DC" : "",
            height: "50px",
            width: "50px",
            marginTop: "10px",
            borderRadius: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => handleMenuClick(PINNED)}
          onMouseEnter={() => setIsHoveredPinned(true)}
          onMouseLeave={() => setIsHoveredPinned(false)}
        >
          <PinIcon width="25" height="25" />
        </div>
        <div
          style={{
            background:
              menuSelected === ALL || isHoveredMessage ? "#CDD6DC" : "",
            height: "50px",
            width: "50px",
            marginTop: "20px",
            borderRadius: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => handleMenuClick(ALL)}
          onMouseEnter={() => setIsHoveredMessage(true)}
          onMouseLeave={() => setIsHoveredMessage(false)}
        >
          <MessageIcon width="25" height="25" />
        </div>
      </div>
      <div>
        <Button
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50px",
          }}
          backgroundColor={"#0C2340"}
          color={"white"}
          onClick={() => {
            setSelectedThread(null);
            handleNavigation(`/tab`);
          }}
        >
          <PlusSign />
        </Button>
      </div>
    </div>
  );
};

export default SideMenu;
