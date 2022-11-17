import { extendTheme } from "@chakra-ui/react"
import type { StyleFunctionProps } from "@chakra-ui/styled-system"
import { mode } from "@chakra-ui/theme-tools"

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        brand: (props: StyleFunctionProps) => ({
          backgroundColor: mode("brand.500", "brand.500")(props),
          color: "white",
          ":hover": {
            backgroundColor: mode("brand.600", "brand.400")(props),
          },
        }),
      },
    },
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("gray.100", "gray.900")(props),
      },
    }),
  },
  colors: {
    brand: {
      "50": "#E8EAFC",
      "100": "#C0C5F7",
      "200": "#97A0F2",
      "300": "#6E7AED",
      "400": "#4555E8",
      "500": "#1C30E3",
      "600": "#1726B5",
      "700": "#111D88",
      "800": "#0B135B",
      "900": "#060A2D",
    },
  },
})

export default theme
