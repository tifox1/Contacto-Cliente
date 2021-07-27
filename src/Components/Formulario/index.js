import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider,createTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Formulario from './Components/Formulario';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';

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
    const [clientes, setClientes] = useState([])
    const history = useHistory();
    const cookies = new Cookies()

    const handleClick = () => {
        cookies.remove('usuario')
        history.push('/login')
    }
    useEffect(() => {
        const cookies = new Cookies();
        if (!cookies.get('usuario')) {
            history.push('/login')
        } else {
            history.push('/')
        }
        fetch('http://192.168.100.190:8000/api/session/', {
            method: 'POST',
            body: JSON.stringify(
                cookies.get('usuario'),
            ),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => {
            setClientes(data.clientes)
        })
    }, [])

    return(<>
        <AppBar className={classes.root} position="static">
            <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                    Contacto Clientes
                </Typography>
                <Button variant="contained" color="secondary" className={classes.margin} onClick={handleClick}>
                    Cerrar Sesión
                </Button>
            </Toolbar>
        </AppBar>
        <Formulario clientes={clientes}/>
    </>);
}

export default FormView