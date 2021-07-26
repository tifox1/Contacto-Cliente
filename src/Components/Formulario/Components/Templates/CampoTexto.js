import { FormControl, TextField } from '@material-ui/core'
import React from 'react'
import Caja from './Caja'

const CampoTexto = (props) => {
    return(
        <Caja title={props.title}>
            <FormControl fullWidth>
                <TextField
                    label="Respuesta"
                    variant="filled"
                    multiline={true}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                />
            </FormControl>
        </Caja>
    )
}

export default CampoTexto