import { Container, NextUIProvider } from "@nextui-org/react"
import { AppProps } from "next/app"
import { Provider } from "react-redux"

import { theme } from "assets"
import { store } from "store"

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextUIProvider theme={theme}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </NextUIProvider>
    </Provider>
  )
}

export default App
