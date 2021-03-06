import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    Radio,
    RadioGroup,
    TextField
} from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import React, { useEffect, useState } from 'react'
import Caja from '../../../Templates/Caja'

const RadioSeleccion = (props) => {
    const [other, setOther] = useState(false)

    useEffect(() => {
        if (props.value === 'other'){
            setOther(true)
        } else {
            setOther(false)
        }
    }, [props.value])

    return(
        <Caja title={props.title}>
            <Grid container>
                <Grid item xs={12}>
                    <FormControl>
                        <RadioGroup
                            value={props.value}
                            onChange={props.onChange}
                            name={props.name}
                            error={props.error}>
                            {props.options.map(option => {
                                    return(
                                        <FormControlLabel
                                            key={props.options.indexOf(option)}
                                            value={option[0]}
                                            control={<Radio />}
                                            label={option[1]}/>
                                    )
                                })
                            }
                            {props.renderOther &&
                                <FormControlLabel
                                    value={"other"}
                                    control={<Radio />}
                                    label="Otro..."/>
                            }
                        </RadioGroup>
                        <Collapse in={props.errorText}>
                            <FormHelperText error>{
                                props.errorText
                            }</FormHelperText>
                        </Collapse>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Collapse in={other}>
                        <FormControl fullWidth>
                            <TextField
                                label="Especificar"
                                variant="outlined"
                                name={props.otherName}
                                value={props.otherValue}
                                onChange={props.onChange}
                                error={props.otherError}
                            />
                        </FormControl>
                        <Collapse in={props.otherError}>
                            <FormHelperText error>{
                                props.otherError
                            }</FormHelperText>
                        </Collapse>
                    </Collapse>
                </Grid>
            </Grid>
        </Caja>
    )
}

export default RadioSeleccion