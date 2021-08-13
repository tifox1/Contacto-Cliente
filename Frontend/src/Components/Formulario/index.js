import Formulario from './Components/Formulario';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { Link, useHistory } from 'react-router-dom';
import { Box, IconButton } from '@material-ui/core';
import Navegacion from '../Navegacion';
import HistoryIcon from '@material-ui/icons/History'

const FormView = () => {
    const [clientes, setClientes] = useState([])
    const history = useHistory();

    useEffect(() => {
        const cookies = new Cookies();
        if (!cookies.get('usuario')) {
            history.push('/login')
        } else {
            history.push('/')
        }
        fetch('/api/session/', {
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
        <Navegacion title="Formulario">
            <IconButton component={Link} to='/test'>
                <HistoryIcon />
            </IconButton>
        </Navegacion>
        <Box marginBottom={3}>
            <Formulario clientes={clientes}/>
        </Box>
    </>);
}

export default FormView