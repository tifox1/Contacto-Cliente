// import reactDom from 'react-dom';
// import './App.css';
import FormView from "./Components/Formulario/index.js"

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
      type: 'dark',
  },
})

function App() {
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormView/>
    </ThemeProvider>
  );
}
export default App; 
