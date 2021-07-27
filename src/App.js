// import Cookies from 'universal-cookie';
// import './App.css';
import FormView from "./Components/Formulario/index.js"
import Login from './Components/Login'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { blue, green, red } from "@material-ui/core/colors";

const theme = createTheme({
    palette: {
        type: 'dark',
        secondary: red
    },
})

function App() {
    const cookies = new Cookies();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login />
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
