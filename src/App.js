// import Cookies from 'universal-cookie';
// import './App.css';
import Formulario from "./Components/Formulario.js"
import Login from "./Components/Login.js";
import Menu from "./Components/Menu.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Cookies from "universal-cookie";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

function App() {
  const sesion = () => {
    alert(cookies.get('usuario'))
    if (cookies.get('usuario') === undefined) {
      return <Redirect to="/login" />
    }
  }
  const cookies = new Cookies()
  return (
    <Router>
      <Switch>
        <Route path="/formulario">

            <ThemeProvider theme={theme}>
              <CssBaseline/>
              <Formulario/>
            </ThemeProvider>
            
        </Route>

        <Route path="/login">
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Login/>
          </ThemeProvider>
        </Route>

        <Route path="/menu">
          {(() => {
            return (
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Menu/>
              </ThemeProvider>
            )
          })}
        </Route>

      </Switch>
    </Router>

  );
}
export default App;
