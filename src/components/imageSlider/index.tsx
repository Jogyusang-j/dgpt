import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { ZoomInIcon, ZoomOutIcon } from "../../assets/icons";
import Breakpoints from "../mediaQuery";

const ImageSliderFeature = ({
  scale,
  setScale,
  incrementScale,
  decrementScale,
}: any) => {
  const { sm, md, lg } = Breakpoints();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bottom: "10px",
          marginTop: "10px",
        }}
      >
        <ZoomInIcon
          onClick={incrementScale}
          width={sm || md || lg ? "30px" : "40px"}
          position={"relative"}
        />
        <Slider
          width={sm ? "200px" : "50%"}
          aria-label="slider-ex-2"
          colorScheme="pink"
          onChange={(val) => setScale(Number(val / 10))}
          value={scale * 10}
          min={0}
          max={100}
        >
          <SliderTrack bg="#000">
            <SliderFilledTrack bg={"#000"} />
          </SliderTrack>
          <SliderThumb bg={"#000"} />
        </Slider>
        <ZoomOutIcon
          onClick={decrementScale}
          width={sm || md || lg ? "30px" : "40px"}
          position={"relative"}
        />
      </div>
    </>
  );
};

export default ImageSliderFeature;
