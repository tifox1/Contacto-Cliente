import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'universal-cookie';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router";
import Caja from './Templates/Caja';
import { FormHelperText } from '@material-ui/core';
import { Collapse } from '@material-ui/core';


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
    const cookies = new Cookies()
    const history = useHistory();
    const [logged, setLogged] = useState(false)
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
                    return response.json()
                } else {
                    return false
                }
            }).then(data => {
                if (data) {
                    cookies.set('usuario', data, {path: '/'})
                    history.push('/')
                }
            })
        },
        validationSchema: Yup.object({
            usuario: Yup.string().required('Ingrese usuario'),
            contrasenia: Yup.string().required('Ingrese contraseña')
        })
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
                                    error={logged && formik.errors.usuario}
                                    fullWidth
                                    onChange={formik.handleChange}
                                />
                                <Collapse in={logged && formik.errors.usuario}>
                                    <FormHelperText error>{formik.errors.usuario}</FormHelperText>
                                </Collapse>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="contrasenia"
                                    variant="outlined"
                                    label="Contraseña"
                                    type="password"
                                    error={logged && formik.errors.contrasenia}
                                    fullWidth
                                    onChange={formik.handleChange}
                                />
                                <Collapse in={logged && formik.errors.contrasenia}>
                                    <FormHelperText error>{formik.errors.contrasenia}</FormHelperText>
                                </Collapse>
                            </Grid>
                            <Grid item
                                alignItems="center"
                                justify="center"
                                xs={12}>
                                    <Button variant="contained"
                                            type="submit"
                                            color="primary"
                                            className={classes.margin}
                                            onClick={() => {setLogged(true)}}>
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