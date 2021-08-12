import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    DatePicker,
  } from '@material-ui/pickers'

const CampoFecha = (props) => {
    return (<>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                inputVariant="outlined"
                label={props.title}
                format="dd/MM/yyyy"
                {...props}
            />
        </MuiPickersUtilsProvider>
    </>)
}

export default CampoFecha