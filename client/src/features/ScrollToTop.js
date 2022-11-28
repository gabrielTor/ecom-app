import { useEffect, useState } from 'react';
// import { ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';
import {FaArrowUp} from 'react-icons/fa'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 1400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [])

  return (
    <>
    {isVisible && (
      <Box
        onClick={scrollToTop}
        position='fixed'
        bottom='20px'
        right={['15%', '15%']}
        zIndex={3}>
        <Button
          size='lg'
          bg='#32CD32'
          variant='solid'>
          <FaArrowUp size={30} />
        </Button>
      </Box>
    )}
  </>
)
}