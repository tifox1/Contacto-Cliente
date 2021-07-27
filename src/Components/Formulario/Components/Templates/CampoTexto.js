import { FormControl, TextField } from '@material-ui/core'
import React from 'react'
import Caja from '../../../Templates/Caja'

const CampoTexto = (props) => {
    return(
        <Caja title={props.title}>
            <FormControl fullWidth>
                <TextField
                    label="Respuesta"
                    variant="outlined"
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