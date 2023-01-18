import { initI18n } from "@/i18n"
import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"

import "@/styles/fonts"
import theme from "@/styles/theme"
import PageLoader from "@/components/PageLoader"

initI18n()

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <PageLoader />
      </SessionProvider>
    </ChakraProvider>
  )
}

export default MyApp
