import React, { Component, useState } from 'react'
import { Redirect } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'universal-cookie';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { alpha, makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import { green, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router";


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


const Login = () => {
    const classes = useStyles();
    
    const [valido, setValido] = useState(false)
    const cookies = new Cookies()
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            usuario: '',
            contrasenia: '',
        },
        onSubmit: value => {
            fetch('http://192.168.100.190:8000/api/usuariovalidacion/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario: value.usuario,
                    contrasenia: value.contrasenia,
                })
            }).then(response => {
                if (response.ok){
                    console.log(response.json)
                    return response.json()
                }
            }).then(data => {
                cookies.set('usuario', data, {path: '/'})
                history.push('/')
            })
        },
    })
    return (<>
        <div>
            <AppBar className={classes.root} position="static">
                <Toolbar>

                    <Typography className={classes.title} variant="h6" noWrap>
                        Contacto Clientes
                    </Typography>

                </Toolbar>
            </AppBar>
            <form onSubmit={formik.handleSubmit}>
                <Grid
                    container
                    xs={11}
                    spacing={2}
                    className={classes.divs}
                >
                    <Grid item
                        alignItems="center"
                        justify="center"
                        xs={12}>
                        <Paper variant="outlined">
                            <Box padding={2}>
                                <FormControl component="fieldset" className={classes.divs}>
                                    <Typography>Usuario</Typography>
                                    <TextField
                                        name="usuario"
                                        variant="filled"
                                        size="medium"
                                        onChange={formik.handleChange}
                                    />
                                    <Typography>Contraseña</Typography>
                                    <TextField
                                        name="contrasenia"
                                        variant="filled"
                                        size="medium"
                                        type="password"
                                        onChange={formik.handleChange}
                                    />


                                    <Grid item
                                        alignItems="center"
                                        justify="center"
                                        xs={12}>
                                        <ThemeProvider size="small" theme={theme}>
                                            <Button variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    className={classes.margin}>
                                                Enviar
                                            </Button>
                                        </ThemeProvider>
                                    </Grid>

                                </FormControl>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </form>
        </div>
    </>)
}
export default Login