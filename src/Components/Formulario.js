import React, { Component, useState } from 'react'
import { useFormik } from 'formik';
import Cookies from 'universal-cookie';
import * as Yup from 'yup';
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


const Formulario = () => {
	// estados de
	const cookies = new Cookies()
	const [mensaje, setMensaje] = useState("")
	const [error, setError] = useState(false)	
	// //
	const classes = useStyles();
	const [clientes, setClientes] = useState([])
	const [mediocontacto, setMediocontacto] = useState(['opcion1', 'opcion2', 'opcion3', 'opcion4', 'opcion5'])
	const [tipocliente, setTipocliente] = useState(['opcion1', 'opcion2', 'opcion3', 'opcion4', 'opcion5'])
	const [dejodecomprar, setDejodecomprar] = useState(['opcion1', 'opcion2', 'opcion3', 'opcion4', 'opcion5'])
	const [cerrasteventa, setCerrasteventa] = useState(['opcion1', 'opcion2', 'opcion3', 'opcion4', 'opcion5'])
	const [productocompetencia, setProductocompetencia] = useState(['opcion1', 'opcion2', 'opcion3', 'opcion4', 'opcion5'])
	const [dequiencompra, setDequiencompra] = useState(['opcion1', 'opcion2', 'opcion3', 'opcion4', 'opcion5'])
	const [detalleproductocompetencia, setDetalleproductocompetencia] = useState()
	const [muestra, setMuestra] = useState(['si', 'no'])
	const [comentario, setComentario] = useState(['si', 'no'])

	const lista_clientes = () => {
		fetch('http://0.0.0.0:8000/api/', {
			method:'POST',
			headers:{
				'Content-Type' : 'application/json',
			},
			body : JSON.stringify({
				id_usuario : cookies.get('usuario')
			})
		}).then(
			request => {
					console.log(request)
			}
		)
	}
	const formik = useFormik({
		initialValues : {
			clientes : '',
			tipocliente : '',
			cerrasteventa:'',
		},
		onSubmit : value => {
			fetch('http://0.0.0.0:8000/api/usuarioread', {
				method: 'POST',
				headers: {
					'Content-Type' : 'application/json',
				},
				body : JSON.stringify({
					clientes : value.clientes,
					tipocliente : value.tipocliente,
					cerrasteventa : value.cerrasteventa,
					
				})
			})
		},
		validationSchema: Yup.object({
			clientes : Yup.string().required(''),
			tipocliente : Yup.string().required(''),
			cerrasteventa : Yup.string().required(''),
		})

	})


	
	return (
		<div>
			<AppBar className={classes.root} position="static">
				<Toolbar>
					
					<Typography className={classes.title} variant="h6" noWrap>
						Contacto Clientes
					</Typography>

					<ThemeProvider size="small" theme={theme}>
						<Button variant="contained" color="secondary" className={classes.margin}>
							Cerrar Sesion
						</Button>
					</ThemeProvider>
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

								<Typography>Cliente</Typography>
									{

										<FormControl variant="filled" className={classes.formControl}>
											
											<InputLabel htmlFor="filled-age-native-simple">Clientes</InputLabel>
											<Select
												native
												name="clientes"
												inputProps={{
													name: 'clientes',
													id: 'clientes',
												}}
												onChange={formik.handleChange} 
												error={formik.errors.clientes}
											>
												<option aria-label="None" checked value="" />
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>

												{/* {
													clientes.map((element) => {
														return <option value={element}>{element}</option>
													})
												} */}

											</Select>
											{formik.errors.clientes && formik.touched.clientes ? <FormHelperText error>Este campo es obligario</FormHelperText> : null}
										</FormControl>

									}

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
									<Typography>Por que medio contactaste?</Typography>
									<RadioGroup aria-label="Schedule" name="mediocontacto">
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
									<RadioGroup aria-label="Schedule" name="tipocliente">
										{

											tipocliente.map((element) => {
												return <FormControlLabel value={element} control={<Radio />} label={element} />
											})

										}

									</RadioGroup>
									{formik.errors.tipocliente && formik.touched.tipocliente ? <FormHelperText error>Este campo es obligatorio</FormHelperText>: null} 
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
									<RadioGroup aria-label="Schedule" name="dejodecomprar">
										{

											dejodecomprar.map((element) => {
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
									<Typography>Cerraste una venta?</Typography>
									<RadioGroup aria-label="Schedule" name="cerrasteventa">
										{

											cerrasteventa.map((element) => {
												return <FormControlLabel value={element} control={<Radio />} label={element} />
											})

										}
									</RadioGroup>
									{formik.errors.cerrasteventa && formik.touched.cerrasteventa ? <FormHelperText error>Este campo es obligatorio</FormHelperText>: null} 
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
									<RadioGroup aria-label="Schedule" name="productocompetencia">
										{

											productocompetencia.map((element) => {
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
									<Typography>De quien compra?</Typography>
									<RadioGroup aria-label="Schedule" name="dequiencompra">
										{

											dequiencompra.map((element) => {
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
									<Typography>Detalle del producto de la competencia</Typography>
									<TextField id="filled-basic" variant="filled"/>
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
									<Typography>Comentarios</Typography>
									<TextField id="filled-basic" rows={2} rowsMax={4} multiline={true} variant="filled" size="medium" />
								</FormControl>
							</Box>
						</Paper>
					</Grid>
				</Grid>

				<Grid
				container
				xs={11}
				spacing={2}
				className={classes.divs}>
					<Grid item
						alignItems="center"
						justify="center"
						xs={12}>
							<ThemeProvider size="small" theme={theme}>
								<Button variant="contained" color="primary" type="submit" className={classes.margin}>
									Enviar
								</Button>
							</ThemeProvider>
						</Grid>
				</Grid>
			</form>

		</div>
	);
}
export default Formulario