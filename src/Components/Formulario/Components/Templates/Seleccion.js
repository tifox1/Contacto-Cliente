import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useState } from 'react'
import Caja from './Caja'

const Seleccion = (props) => {
    const [value, setValue] = useState('')
    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return(<>
        <Caja title={props.title}>
            <FormControl variant="filled" fullWidth>
                <InputLabel
                    htmlFor="filled-age-native-simple">
                    Seleccionar
                </InputLabel>
                <Select value={props.value}
                        name={props.name}
                        error={props.error}
                        onChange={props.onChange}>{
                    props.options.map(option => {
                        return (
                            <MenuItem
                                key={props.options.indexOf(option)}
                                value={option[0]}>
                                {option[1]}
                            </MenuItem>
                        )
                    })
                }</Select>
                <FormHelperText error>{props.errorText}</FormHelperText>
            </FormControl>
        </Caja>
    </>)
}

export default Seleccion