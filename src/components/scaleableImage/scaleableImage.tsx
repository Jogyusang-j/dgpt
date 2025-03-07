import { Flex, Image } from "@chakra-ui/react";
import { useState } from "react";
// import LargeFallckImage from "../../assets/images/language-icon.tsx";

export const ScaleableImage = ({ scale = 1, src = "" }: any) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: any) => {
    if (isDragging) {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      setPosition((prevPosition) => ({
        top: prevPosition.top + dy,
        left: prevPosition.left + dx,
      }));
      setStartPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: any) => {
    setIsDragging(true);
    setStartPos({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchMove = (e: any) => {
    if (isDragging) {
      const dx = e.touches[0].clientX - startPos.x;
      const dy = e.touches[0].clientY - startPos.y;
      setPosition((prevPosition) => ({
        top: prevPosition.top + dy,
        left: prevPosition.left + dx,
      }));
      setStartPos({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <Flex
      userSelect={"none"}
      width={"100%"}
      height={"100%"}
      // minH={"400px"}
      overflow={"hidden"}
      borderRadius={"16px"}
    >
      <Image
        style={{
          transform: `scale(${scale}) translate(${position.left}px, ${position.top}px)`,
          cursor: isDragging ? "grabbing" : "grab",
          margin: "auto",
        }}
        // maxW={"600px"}
        height={"70vh"}
        borderRadius={"10px"}
        // objectFit={"contain"}
        // fallbackSrc={LargeFallckImage}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        src={src}
        alt=""
      />
    </Flex>
  );
};
