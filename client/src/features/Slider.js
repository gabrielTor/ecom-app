import style from './styles/slider.module.css'
import { useState, useEffect } from "react"
import { Box, Image, Button, Flex, Show } from '@chakra-ui/react'

const imgArr = [
    {id: 1, img: 'https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1669409420757-home-sliderdesktop2.jpg'},
    {id: 2, img: 'https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1668749474218-home-sliderdesktop.jpg'},
    {id: 3, img: 'https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1669343785551-home-sliderdesktop2.jpg'},
    {id: 4, img: 'https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1669417005439-home-sliderdesktop.jpg'},
    {id: 5, img: 'https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1669417067048-home-sliderdesktop2.jpg'},
    {id: 6, img: 'https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1669417108524-home-sliderdesktop.jpg'}
]

export default function Slider() {

  const [slide, setSlide] = useState(1)

  const nextBtn = () => {
    if(slide === imgArr.length) setSlide(1)
    else setSlide(prev => prev + 1)
  }
  const prevBtn = () => {
    if(slide === 1) setSlide(imgArr.length)
    else setSlide(prev => prev - 1)
  }

  useEffect(()=>{
    const interval = setInterval(() => {
      nextBtn()
    }, 4000)
    return () => clearInterval(interval)
  })

  return (
    <Box className={style.slideshowContainer}>
      {imgArr.map(({id, img}) => (
      <Box key={id}>
          <Image
            className={id === slide ? `${style.display} ${style.fade}` : style.noDisplay} 
            src={img}
            alt='sliderImages'/>
      </Box>))}
      <Flex w='100%' justify='center'>
        <Show breakpoint='(min-width: 650px)'><Button className={style.btn} onClick={prevBtn}>&#10094;</Button></Show>
        <Flex justify='center' pt='1%'>
          {imgArr.map(({id}) => (
            <span key={id} onClick={()=>setSlide(id)} className={id === slide ? `${style.dot} ${style.active}` : style.dot}></span>
          ))}
        </Flex>
        <Show breakpoint='(min-width: 650px)'><Button className={style.btn} onClick={nextBtn}>&#10095;</Button></Show>
      </Flex>
    </Box>
  )
}