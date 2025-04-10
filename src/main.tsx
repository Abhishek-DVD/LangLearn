import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {ThemeProvider} from "@emotion/react"
import {createTheme, CssBaseline} from "@mui/material"
import {Provider} from "react-redux";
import store from './redux/store.tsx'

const theme = createTheme({
  palette:{
    primary:{
      main:"rgb(255,0,0)",
    },
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
