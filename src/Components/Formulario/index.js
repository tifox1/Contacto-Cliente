import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Formulario from './Components/Formulario';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import { Box, Collapse, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Fade } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      background:'#000',
    },

    title: {
      flexGrow: 1,
    },

    divs:{
      margin:"auto",
    }

  }));

const FormView = () => {
    const classes = useStyles();
    const [clientes, setClientes] = useState([])
    const cookies = new Cookies()
    const history = useHistory();

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
    }, [history])

    return(<>
        <AppBar className={classes.root} position="fixed">
            <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                    Contacto Clientes
                </Typography>
                <Button
                    onClick={handleClick}
                    endIcon={<ExitToAppIcon />}>
                    {cookies.get('usuario') ? cookies.get('usuario').usuario : ''}
                </Button>
            </Toolbar>
        </AppBar>
        <Box marginTop={7} marginBottom={3}>
            <Formulario clientes={clientes}/>
        </Box>
    </>);
}

export default FormView