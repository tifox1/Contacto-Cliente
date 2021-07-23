import React, { Component, useState } from 'react'
import { Formik, useFormik } from 'formik';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { alpha, makeStyles, ThemeProvider,createTheme } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Seleccion from './Components/Templates/Seleccion';
import RadioSeleccion from './Components/Templates/Radio';
import CampoTexto from './Components/Templates/CampoTexto';
import { Box, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      background:'#000',
    },

    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },

    divs:{
      margin:"auto",
    }

  }));

const theme = createTheme({
	palette:{
		primary: green,
	},
});


const Formulario = () => {
    const classes = useStyles();

    return(<>
        <AppBar className={classes.root} position="static">
            <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                    Contacto Clientes
                </Typography>
                <ThemeProvider size="small" theme={theme}>
                <Button variant="contained" color="primary" className={classes.margin}>
                    Cerrar Sesion
                </Button>
                </ThemeProvider>
            </Toolbar>
        </AppBar>
        <form onSubmit={Formik}>
        <Grid container xs={12} component={Box} padding={1}>
            <Seleccion title="Cliente" options={[
                ['0', 'cero'],
                ['1', 'uno']
            ]}/>
            <RadioSeleccion title="¿Por qué medio contactaste?"
                options={[
                    ['Visita al Cliente','Visita al Cliente'],
                    ['Whatsapp','Whatsapp'],
                    ['Llamada','Llamada'],
                    ['Correo Electronico','Correo Electronico'],
                    ['Visito Segupak','Visito Segupak'],
                ]}
            />
            <RadioSeleccion title="Tipo de cliente"
                options={[
                    ['Habitual','Habitual'],
                    ['Dejo de Comprar','Dejo de Comprar'],
                    ['En gestion de compra','En gestion de compra'],
                    ['Casual','Casual'],
                ]}
            />
            <RadioSeleccion title="¿Porqué dejó de comprar?"
                options={[
                    ['Precio','Precio'],
                    ['Producto Faltante','Producto Faltante'],
                ]}
            />
            <RadioSeleccion title="¿Cerraste una venta?"
                options={[
                    ['Si','Si'],
                    ['No','No'],
                    ['Cotizacion','Cotizacion'],
                ]}
            />
            <RadioSeleccion title="Compró algún producto de la competencia?"
                options={[
                    ['Cintas','Cintas'],
                    ['FILM','FILM'],
                    ['FLEJES','FLEJES'],
                    ['POF','POF'],
                ]}
                renderOther={true}
            />
            <RadioSeleccion title="¿De quién compra?"
                options={[
                    ['Cintas S.A.','Cintas S.A.'],
                    ['FONDO ESTRELLA S.A.','FONDO ESTRELLA S.A.'],
                    ['PARPACK S.A','PARPACK S.A.'],
                ]}
                renderOther={true}
            />
            <CampoTexto title="Detalle del producto de la competencia"/>
            <RadioSeleccion title="¿Conseguiste una muestra?" 
                options={[
                    ['Si','Si'],
                    ['No','No'],
                ]}
            />
            <CampoTexto title="Comentarios"/>
            <Grid component={Box} padding={1}>
                <Button type="submit" color="primary" variant="contained">Enviar</Button>
            </Grid>
        </Grid>
        </form>
    </>);
}
export default Formulario