import {
  Box,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Breakpoints from "../mediaQuery";
import { CenterFlex } from "../centerFlex";
import { RightIcon } from "../../assets/icons/rightIcon";
import { LeftIcon } from "../../assets/icons";
import { ImageLoader } from "../../assets";
import ImageSliderFeature from "../imageSlider";
import { ScaleableSliderImages } from "../scaleableSliderImages";
import { ScaleableImage } from "../scaleableImage/scaleableImage";

// Custom Next Arrow Component
const NextArrow = ({ onClick }: any) => (
  <CenterFlex
    width={"48px"}
    height={"48px"}
    position="absolute"
    left="105%"
    top="50%"
    transform="translate(0, -50%)"
    zIndex={2}
    borderRadius={"8px"}
    cursor={"pointer"}
    userSelect={"none"}
    onClick={onClick}
  >
    <RightIcon />
  </CenterFlex>
);

const PrevArrow = ({ onClick }: any) => (
  <CenterFlex
    width={"48px"}
    height={"48px"}
    position="absolute"
    right="105%"
    top="50%"
    transform="translate(0, -50%)"
    zIndex={2}
    borderRadius={"8px"}
    cursor={"pointer"}
    userSelect={"none"}
    onClick={onClick}
  >
    <LeftIcon />
  </CenterFlex>
);

const ImageSliderModal = ({
  isOpen,
  onClose,
  selectedIndex = 0,
  data,
}: any) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const { sm, md, lg, xl, xxl } = Breakpoints();
  const sliderRef: any = useRef(null); // Reference to the slider
  const [scale, setScale] = useState(0.8);

  const incrementScale = () => {
    if (scale < 10) {
      // Set an upper limit for zoom-in
      setScale((prevScale) => Math.min(prevScale + 0.1, 10)); // Increment by 0.1, max 10
    }
  };

  const decrementScale = () => {
    if (scale <= 0.6) return;
    if (scale > 0.6) {
      // Set a lower limit for zoom-out
      setScale((prevScale) => Math.max(prevScale - 0.1, 0.1)); // Decrement by 0.1, min 0.1
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: md || lg || xl || xxl,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_: any, next: any) => setMainImageIndex(next),
  };

  useEffect(() => {
    setMainImageIndex(selectedIndex);
  }, [selectedIndex, sliderRef]);

  useEffect(() => {
    // Trigger only if sliderRef has a valid current value
    if (sliderRef?.current) {
      sliderRef.current.slickGoTo(selectedIndex); // Go to the selected index slide
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderRef.current]);

  const goToSlide = (index: any) => {
    setScale(0.8);
    if (sliderRef?.current && sliderRef?.current?.slickGoTo) {
      sliderRef.current.slickGoTo(index); // Use ref to call slickGoTo()
      setMainImageIndex(index);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setScale(0.8);
        onClose();
      }}
      onOverlayClick={() => {
        setScale(0.8);
        onClose();
      }}
      size={sm || md || lg ? "xl" : "4xl"}
    >
      <ModalOverlay />
      <ModalContent m={"auto"} bgColor={"white"}>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody padding={"24px"} borderRadius={"16px"}>
          {/* Main Image Slider */}
          {data?.length === 1 ? (
            <Box w="full" flex={1} position="relative">
              {data?.map((img: any, index: number) => (
                <Box
                  h={"100%"}
                  key={index}
                  borderRadius={"8px"}
                  overflow={"hidden"}
                >
                  {/* <Image
                    src={img?.path}
                    fallback={
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <ImageLoader />
                      </div>
                    }
                    alt={`Image ${index}`}
                    objectFit={"contain"}
                    w="full"
                    h="60vh"
                  /> */}
                  <ScaleableImage src={img?.path} scale={scale} />
                  <ImageSliderFeature
                    scale={scale}
                    setScale={setScale}
                    incrementScale={incrementScale}
                    decrementScale={decrementScale}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            <Box w="full" flex={1} position="relative">
              <Slider ref={sliderRef} {...sliderSettings}>
                {data?.map((img: any, index: number) => (
                  <Box
                    h={"100%"}
                    key={index}
                    borderRadius={"8px"}
                    overflow={"hidden"}
                  >
                    <ScaleableSliderImages src={img?.path} scale={scale} />
                  </Box>
                ))}
              </Slider>
              <ImageSliderFeature
                scale={scale}
                setScale={setScale}
                incrementScale={incrementScale}
                decrementScale={decrementScale}
              />
            </Box>
          )}

          {/* Thumbnails */}
          <Flex gap={"10px"} mt={"12px"} width={"100%"} overflow={"scroll"}>
            {data?.map((img: any, index: number) => (
              <Box
                key={index}
                userSelect={"none"}
                cursor="pointer"
                border={
                  mainImageIndex === index
                    ? "2px solid blue"
                    : "2px solid transparent"
                }
                onClick={() => {
                  goToSlide(index);
                }}
                minW={"136px"}
                maxH={"77px"}
                borderRadius={"5px"}
                overflow={"hidden"}
              >
                <Image
                  fallback={<ImageLoader />}
                  src={img?.path}
                  alt={`Thumbnail ${index}`}
                  w="100%"
                  h="60px"
                  objectFit="cover"
                />
              </Box>
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageSliderModal;
