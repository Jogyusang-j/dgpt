/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
// import useCustomTheme from "@root/hooks/useCustomTheme";

interface ICustomPopup extends ModalContentProps {
  children: any;
  open: boolean;
  onClose: () => void | null;
  showCloseHeader?: boolean;
  title?: string;
  mdWidth?: string;
  width?: string;
  smWidth?: string;
  onOutsideClick?: any;
}
function CustomPopup(props: ICustomPopup) {
  const {
    children,
    open = false,
    onClose = () => null,
    showCloseHeader = true,
    title = "Title",
    width = "calc(100% - 900px)",
    mdWidth = "calc(100% - 900px)",
    smWidth,
    onOutsideClick,
    ...restProps
  } = props;
  const { t } = useTranslation("common");
  // const {isDarkTheme} = useCustomTheme()
  return (
    <Modal onOverlayClick={onOutsideClick} isOpen={open} onClose={onClose}>
      <ModalOverlay />

      <ModalCloseButton
        style={{ border: "1px solid #FFFFFF" }}
        onClick={() => onClose()}
        color={"#FFFFFF"}
      />
      <ModalContent
        m={"auto"}
        minWidth={{
          base: "100%",
          md: mdWidth,
          sm: smWidth || width,
          lg: width,
        }}
        {...restProps}
        maxH={"100vh"}
        bgColor={"#FFFFFF"}
      >
        <ModalHeader>{t("chats.image_title")}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter style={{ display: "none" }}></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { CustomPopup };
