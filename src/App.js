// import reactDom from 'react-dom';
// import './App.css';
import Formulario from "./Components/Formulario/index.js"

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
      type: 'dark',
  },
})

function App() {
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Formulario/>
    </ThemeProvider>
  );
}
export default App; 
