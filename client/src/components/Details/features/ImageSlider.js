import { Image, Box } from "@chakra-ui/react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

export default function ImageSlider({ slides }) {
  const renderMin = (mins) => {
    return mins.map((min, i) => (
      <Image key={i} src={min.props.src} />
    ));
  };

  return (
    <Box w={['fit-content', '45%', '40%']} h='20%' m={['5%', '2%']}>
      <Carousel renderThumbs={renderMin} thumbWidth={"13%"} infiniteLoop>
        {slides?.map((slide) => (
          <Image src={slide.url} key={slide._id} h={"32rem"} w={"100%"} />
        ))}
      </Carousel>
    </Box>
  )
}