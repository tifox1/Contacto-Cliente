import { FormControl, TextField } from '@material-ui/core'
import React from 'react'
import Caja from './Caja'

const CampoTexto = (props) => {
    return(
        <Caja title={props.title}>
            <FormControl fullWidth>
                <TextField label="Respuesta" variant="filled" multiline={true}/>
            </FormControl>
        </Caja>
    )
}

export default CampoTexto