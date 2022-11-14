import { Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ImageSlider({ slides }) {
  const renderMin = (mins) => {
    return mins.map((min, i) => (
      <Image key={i} src={min.props.src} />
    ));
  };

  return (
    <Carousel renderThumbs={renderMin} thumbWidth={"13%"} infiniteLoop>
      {slides.map((slide, i) => {
        return <Image src={slide} key={i} h={"32rem"} W={"100%"} />;
      })}
    </Carousel>
  );
};