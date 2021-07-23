import React, { Component, useState } from 'react'
import { Formik, useFormik } from 'formik';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { alpha, makeStyles, ThemeProvider,createTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { green, purple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Caja from './Components/Templates/Caja';
import { MenuItem } from '@material-ui/core';

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
    // const formik = useFormik();

    const classes = useStyles();
    const [clientes,setClientes] = useState([])
    const [mediocontacto,setMediocontacto] = useState(['opcion1', 'opcion2', 'opcion3', 'opcion4', 'opcion5'])
    const [tipocliente, setTipocliente] = useState(['opcion1', 'opcion2', 'opcion3', 'opcion4', 'opcion5'])
    const [dejodecomprar, setDejodecomprar] = useState(['opcion1', 'opcion2', 'opcion3', 'opcion4', 'opcion5'])
    const [cerrasteventa, setCerrasteventa] = useState(['opcion1', 'opcion2', 'opcion3', 'opcion4', 'opcion5'])
    const [productocompetencia, setProductocompetencia] = useState(['opcion1', 'opcion2', 'opcion3', 'opcion4', 'opcion5'])
    const [dequiencompra, setDequiencompra] = useState(['opcion1', 'opcion2', 'opcion3', 'opcion4', 'opcion5'])
    const [detalleproductocompetencia, setDetalleproductocompetencia] = useState()
    const [muestra, setMuestra] = useState(['si', 'no'])
    const [comentario, setComentario] = useState(['si', 'no'])

    return(
    	<div>
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
            <Caja title="Cliente">
                <FormControl variant="filled" fullWidth>
                <InputLabel htmlFor="filled-age-native-simple">Seleccionar</InputLabel>
                <Select>
                    <MenuItem>1</MenuItem>
                </Select>
                </FormControl>
            </Caja>


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
                    <FormControl component="fieldset">
                      <Typography>Por que medio contactaste?</Typography>
                      <RadioGroup aria-label="Schedule" name="opcion">
                        {

                          mediocontacto.map((element) => {
                            return <FormControlLabel value={element} control={<Radio />} label={element} />
                          })

                        }
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            

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
                    <FormControl component="fieldset">
                      <Typography>Tipo de Cliente</Typography>
                      <RadioGroup aria-label="Schedule" name="opcion">
                        {

                          tipocliente.map((element) => {
                            return <FormControlLabel value={element} control={<Radio />} label={element}/>
                          })

                        }
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Paper>
              </Grid>
            </Grid>


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
                    <FormControl component="fieldset">
                      <Typography>Porque dejo de comprar?</Typography>
                      <RadioGroup aria-label="Schedule" name="opcion">
                        {

                          dejodecomprar.map((element) => {
                            return <FormControlLabel value={element} control={<Radio />} label={element}/>
                          })

                        }
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Paper>
              </Grid>
            </Grid>


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
                    <FormControl component="fieldset">
                      <Typography>Cerraste una venta?</Typography>
                      <RadioGroup aria-label="Schedule" name="opcion">
                        {

                          cerrasteventa.map((element) => {
                            return <FormControlLabel value={element} control={<Radio />} label={element}/>
                          })

                        }
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Paper>
              </Grid>
            </Grid>


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
                    <FormControl component="fieldset">
                      <Typography>Compra algun producto de la competencia?</Typography>
                      <RadioGroup aria-label="Schedule" name="opcion">
                        {

                          productocompetencia.map((element) => {
                            return <FormControlLabel value={element} control={<Radio />} label={element}/>
                          })

                        }
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Paper>
              </Grid>
            </Grid>


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
                    <FormControl component="fieldset">
                      <Typography>De quien compra?</Typography>
                      <RadioGroup aria-label="Schedule" name="opcion">
                        {

                          dequiencompra.map((element) => {
                            return <FormControlLabel value={element} control={<Radio />} label={element}/>
                          })

                        }
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Paper>
              </Grid>
            </Grid>




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
                    <FormControl component="fieldset">
                      <Typography>Detalle del producto de la competencia</Typography>
                      <RadioGroup aria-label="Schedule" name="opcion">
                        <TextField id="filled-basic" variant="filled" />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Paper>
              </Grid>
            </Grid>


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
                    <FormControl component="fieldset">
                      <Typography>Conseguiste la muestra?</Typography>
                      <RadioGroup aria-label="Schedule" name="opcion">
                        {

                          muestra.map((element) => {
                            return <FormControlLabel value={element} control={<Radio />} label={element}/>
                          })

                        }
                      </RadioGroup> 
                    </FormControl>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

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
                    <FormControl component="fieldset">
                      <Typography>Comentarios</Typography>     
                      <TextField id="filled-basic" rows={2} rowsMax={4} multiline={true} variant="filled" size="medium"/>
                    </FormControl>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </form>

        </div>
    );
}
export default Formulario