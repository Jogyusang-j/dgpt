import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
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
function ImageSliderPopup(props: ICustomPopup) {
  const {
    children,
    open = false,
    onClose = () => null,
    showCloseHeader = true,
    title = "Title",
    width = "500px",
    mdWidth = "500px",
    smWidth,
    onOutsideClick,
    ...restProps
  } = props;
  // const {isDarkTheme} = useCustomTheme()
  return (
    <Modal onOverlayClick={onOutsideClick} isOpen={open} onClose={onClose}>
      <ModalOverlay />
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
        {showCloseHeader && (
          <ModalHeader
            borderBottom={"1px solid"}
            borderColor={"theme.gray.200"}
          >
            <Text fontSize={"20px"} fontWeight={500}>
              {title}
            </Text>
            <ModalCloseButton mt={"6px"} />
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export { ImageSliderPopup };
