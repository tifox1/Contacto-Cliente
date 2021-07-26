
import React, { Component, useState } from 'react'
import { Formik, useFormik } from 'formik';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { alpha, makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { green, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { TouchAppRounded } from '@material-ui/icons';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: '#000',
    },

    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    divs: {
        margin: "auto",
    }

}));

const theme = createTheme({
    palette: {
        primary: green,
        secondary: red
    },
});

const Menu = () => {
    const classes = useStyles()
    const cookies = new Cookies()
    const [sesion,setSesion] = useState(true)
    const history = useHistory()
    const onClick= () =>{
        cookies.remove('usuario')
        history.push('/login')
    }
    return (
        <div>
            <AppBar className={classes.root} position="static">
                <Toolbar>

                    <Typography className={classes.title} variant="h6" noWrap>
                        Contacto Clientes
                    </Typography>

                    <ThemeProvider size="small" theme={theme}>
                        <Button variant="contained" color="secondary" className={classes.margin} onClick={onClick}>
                            Cerrar Sesion
                        </Button>
                    </ThemeProvider>
                </Toolbar>
            </AppBar>

            <form>
                <Grid item
                    alignItems="center"
                    justify="center"
                    xs={12}>
                    <ThemeProvider size="small" theme={theme}>
                        <Button variant="contained" color="primary" className={classes.margin}>
                            Enviar Formulario
                        </Button>
                    </ThemeProvider>
                </Grid>
            </form>
        </div>
    )
}
export default Menu