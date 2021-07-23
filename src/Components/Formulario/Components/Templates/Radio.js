import {
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField
} from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import React, { useState } from 'react'
import Caja from './Caja'

const RadioSeleccion = (props) => {
    const [value, setValue] = useState('')
    const [other, setOther] = useState(false)
    const handleChange = (e) => {
        setValue(e.target.value)
        if (e.target.value === 'other') {
            setOther(true)
        } else{
            setOther(false)
        }
    }

    return(
        <Caja title={props.title}>
            <Grid container>
                <Grid item xs={12}>
                    <FormControl>
                        <RadioGroup value={value} onChange={handleChange}>
                            {props.options.map(option => {
                                    return(
                                        <FormControlLabel
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
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Collapse in={other}>
                        <FormControl fullWidth>
                            <TextField label="Especificar" variant="filled"/>
                        </FormControl>
                    </Collapse>
                </Grid>
            </Grid>
        </Caja>
    )
}

export default RadioSeleccion