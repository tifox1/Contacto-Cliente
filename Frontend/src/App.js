// import Cookies from 'universal-cookie';
// import './App.css';
import FormView from "./Components/Formulario/index.js"
import Login from './Components/Login'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { red } from "@material-ui/core/colors";
import ListaEnviados from "./Components/ListaEnviados.js";

const theme = createTheme({
    palette: {
        type: 'dark',
        secondary: red
    },
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/test">
                        <ListaEnviados />
                    </Route>
                    <Route path="/">
                        <FormView />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}
export default App;
