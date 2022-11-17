import { initI18n } from "@/i18n"
import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"

import "@/styles/fonts"
import theme from "@/styles/theme"

initI18n()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
