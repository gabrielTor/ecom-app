import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Show,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Footer(){
  
  return(
  <Container as="footer" role="contentinfo" bg='gray.300' maxW='100%'>
    <Show breakpoint='(min-width: 450px)'>
    <Stack
      w='100%'
      spacing="5"
      direction={{
        base: 'column',
        md: 'row',
      }}
      justify="space-evenly"
      py={{
        base: '1',
        md: '16',
      }}
    >
      <Stack
        w='100%'
        direction={{
          base: 'column-reverse',
          md: 'column',
          lg: 'row',
        }}
        spacing={{
          base: '1',
          md: '8',
        }}
      >
        <Stack direction="row" spacing="4%" w='100%'>

          <Stack spacing="2" flex="1" w='100%'>
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Product
            </Text>
            <Stack spacing="1" w='100%' shouldWrapChildren>
              <Button variant="link">How it works</Button>
              <Button variant="link">Pricing</Button>
              <Button variant="link">Use Cases</Button>
            </Stack>
          </Stack>

          <Stack spacing="2" flex="1" w='100%'>
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Product
            </Text>
            <Stack spacing="1" w='100%' shouldWrapChildren>
              <Button variant="link">How it works</Button>
              <Button variant="link">Pricing</Button>
              <Button variant="link">Use Cases</Button>
            </Stack>
          </Stack>

          <Stack spacing="2" flex="1" w='100%'>
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Legal
            </Text>
            <Stack spacing="1" w='100%' shouldWrapChildren>
              <Button variant="link">Privacy</Button>
              <Button variant="link">Terms</Button>
              <Button variant="link">License</Button>
            </Stack>
          </Stack>

          <Stack spacing="2" flex="1" w='100%'>
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Product
            </Text>
            <Stack spacing="1" w='100%' shouldWrapChildren>
              <Button variant="link">How it works</Button>
              <Button variant="link">Pricing</Button>
              <Button variant="link">Use Cases</Button>
            </Stack>
          </Stack>

        </Stack>
      </Stack>
    </Stack>
    </Show>

    <Divider />

    <Stack
      pt="8"
      pb="12"
      justify="space-evenly"
      direction={{
        base: 'column-reverse',
        md: 'row',
      }}
      align="center"
    >
      <Text fontSize="sm" color="subtle">
        &copy; 2022 Gabriel Torres, Inc. All rights reserved.
      </Text>
      <ButtonGroup variant="ghost">
        <IconButton
          as="a"
          href="https://www.linkedin.com/in/dario-gabriel-torres-576a3561"
          aria-label="LinkedIn"
          icon={<FaLinkedin fontSize="1.25rem" />}
        />
        <IconButton as="a" href="https://github.com/gabrielTor" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
        <IconButton as="a" href="https://www.facebook.com/nmz4ygabriel" aria-label="Facebook" icon={<FaFacebook fontSize="1.25rem" />} />
      </ButtonGroup>
    </Stack>
  </Container>
  )
}
