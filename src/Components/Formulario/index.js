import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider,createTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Formulario from './Components/Formulario';

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


const FormView = () => {
    const classes = useStyles();

    return(<>
        <AppBar className={classes.root} position="static">
            <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                    Contacto Clientes
                </Typography>
                <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary" className={classes.margin}>
                    Cerrar Sesion
                </Button>
                </ThemeProvider>
            </Toolbar>
        </AppBar>
        <Formulario />
    </>);
}

export default FormView