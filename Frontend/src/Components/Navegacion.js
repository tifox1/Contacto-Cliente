import React from 'react'
import {
    AppBar,
    Box,
    Button,
    IconButton,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Cookies from 'universal-cookie';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: '#000',
    },
    title: {
        flexGrow: 1,
    },
}))

const Navegacion = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const cookies = new Cookies()

    const handleClick = () => {
        cookies.remove('usuario')
        history.push('/login')
    }

    return (<>
        <Box marginBottom={7}>
            <AppBar className={classes.root} position="fixed">
                <Toolbar>
                    {(() => {
                        if (props.back) {
                            return (
                                <IconButton
                                    component={Link} to={props.back}
                                >
                                    <ArrowBackIcon/>
                                </IconButton>
                            )
                        }
                    })()}
                    <Typography className={classes.title} variant="h6">
                        {props.title}
                    </Typography>
                    {props.children}
                    <Button
                        onClick={handleClick}
                        endIcon={<ExitToAppIcon />}>{
                            cookies.get('usuario')
                                ? cookies.get('usuario').usuario : ''
                    }</Button>
                </Toolbar>
            </AppBar>
        </Box>
    </>)
}

export default Navegacion
