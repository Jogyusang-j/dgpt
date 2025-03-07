import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { DgptLogo, MenuButton } from "../../assets";
import { useRef, useState } from "react";
import { Sidebar } from "../sidebar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { onClose } = useDisclosure();
  const btnRef = useRef(null);
  const onOpen = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Drawer
        size={"full"}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent background={"white"}>
          <DrawerCloseButton onClick={() => setIsOpen(false)} />

          <DrawerBody style={{ padding: "10px" }}>
            <Sidebar setIsOpen={setIsOpen} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <div
        style={{
          alignItems: "center",
          borderRadius: "16px",
          padding: "10px",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <DgptLogo width={44} height={44} />
        <div style={{ marginTop: "5px", cursor: "pointer" }}>
          <div ref={btnRef} onClick={() => onOpen()}>
            <MenuButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
