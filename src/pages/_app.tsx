import { initI18n } from "@/i18n"
import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import * as Sentry from "@sentry/react"
import { BrowserTracing } from "@sentry/tracing"

import "@/styles/fonts"
import theme from "@/styles/theme"
import PageLoader from "@/components/PageLoader"

initI18n()

Sentry.init({
  dsn: "https://624772cb11104f9daaeef12f7da8ae36@o447297.ingest.sentry.io/5427021",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

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
