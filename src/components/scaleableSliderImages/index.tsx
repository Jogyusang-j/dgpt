import { Image } from "@chakra-ui/react";
import { useState } from "react";
import { ImageLoader } from "../../assets";

export const ScaleableSliderImages = ({ scale, src = "" }: any) => {
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
    <Image
      style={{
        transform: `scale(${scale}) translate(${position.left}px, ${position.top}px)`,
        cursor: isDragging ? "grabbing" : "grab",
        margin: "auto",
      }}
      fallback={
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ImageLoader />
        </div>
      }
      objectFit={"contain"}
      // w="full"
      height={"50vh"}
      borderRadius={"10px"}
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
  );
};
