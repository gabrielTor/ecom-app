import {
  Button, ButtonGroup, Container,
  Divider, IconButton, Show,
  Stack, Text,
} from '@chakra-ui/react'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'
import { AiFillGitlab } from 'react-icons/ai'

export default function Footer() {

  return (
    <Container as="footer" role="contentinfo" bg='gray.300' maxW='100%' mt='10%'>
      <Show breakpoint='(min-width: 470px)'>
        <Stack w='100%' py='3%'>
          <Stack direction="row" justify='space-around' w='100%'>

            <Stack>
              <Text fontSize="lg" fontWeight="semibold">
                About
              </Text>
              <Stack spacing="1" w='100%' shouldWrapChildren>
                <Button variant="link">About us</Button>
                <Button variant="link">Features</Button>
                <Button variant="link">News & Blog</Button>
              </Stack>
            </Stack>

            <Stack>
              <Text fontSize="lg" fontWeight="semibold">
                Product
              </Text>
              <Stack spacing="1" w='100%' shouldWrapChildren>
                <Button variant="link">How it works</Button>
                <Button variant="link">Pricing</Button>
                <Button variant="link">Use Cases</Button>
              </Stack>
            </Stack>

            <Stack>
              <Text fontSize="lg" fontWeight="semibold">
                Support
              </Text>
              <Stack spacing="1" w='100%' shouldWrapChildren>
                <Button variant="link">FAQs</Button>
                <Button variant="link">Support Center</Button>
                <Button variant="link">Contact us</Button>
              </Stack>
            </Stack>

            <Stack>
              <Text fontSize="lg" fontWeight="semibold">
                Legal
              </Text>
              <Stack spacing="1" w='100%' shouldWrapChildren>
                <Button variant="link">Privacy</Button>
                <Button variant="link">Terms</Button>
                <Button variant="link">License</Button>
              </Stack>
            </Stack>

          </Stack>
        </Stack>
      </Show>

      <Divider />

      <Stack py='8' justify="space-evenly" align="center"
        direction={{ base: 'column-reverse', md: 'row' }}>
        <Text fontSize="sm">
          &copy; 2022 Gabriel Torres, Inc. All rights reserved.
        </Text>
        <ButtonGroup variant="ghost">
          <IconButton as="a" href="https://www.linkedin.com/in/dario-gabriel-torres-576a3561" aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" color='#0077b5' />} />
          <IconButton as="a" href="https://github.com/gabrielTor" aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />} />
          <IconButton as="a" href="https://gitlab.com/dariogabrieltorres" aria-label="GitLab"
            icon={<AiFillGitlab fontSize="1.3rem" color='#fca326' />} />
          <IconButton as="a" href="https://www.facebook.com/nmz4ygabriel" aria-label="Facebook"
            icon={<FaFacebook fontSize="1.25rem" color='#4267B2' />} />
        </ButtonGroup>
      </Stack>
    </Container>
  )
}