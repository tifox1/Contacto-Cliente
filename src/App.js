// import Cookies from 'universal-cookie';
// import './App.css';
import FormView from "./Components/Formulario/index.js"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
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
