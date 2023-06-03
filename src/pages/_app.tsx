import type { AppProps } from 'next/app'
import { GlobalStyle } from '../styles/global'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../styles/themes'
import { Header } from '../components/Header'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const toggleTheme = () => {
    setIsDarkTheme(prevMode => !prevMode)
  }

  return(
    <>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <Header toggleTheme={toggleTheme} isDark={isDarkTheme}/>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}