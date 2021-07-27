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
import { blue, green, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router";
import Caja from './Templates/Caja';


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
                <Grid container component={Box} padding={1}>
                    <Caja title="Iniciar sesión">
                        <Grid
                            container
                            component={FormControl}
                            spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="usuario"
                                    variant="outlined"
                                    label="Usuario"
                                    fullWidth
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="contrasenia"
                                    variant="outlined"
                                    label="Contraseña"
                                    type="password"
                                    fullWidth
                                    onChange={formik.handleChange}
                                />
                            </Grid>

                                <Grid item
                                    alignItems="center"
                                    justify="center"
                                    xs={12}>
                                        <Button variant="contained"
                                                type="submit"
                                                color="primary"
                                                className={classes.margin}>
                                            Acceder
                                        </Button>
                                </Grid>
                        </Grid>
                    </Caja>
                </Grid>
            </form>
        </div>
    </>)
}
export default Login