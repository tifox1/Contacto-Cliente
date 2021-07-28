import { Collapse, FormControl, FormHelperText, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import Caja from '../../../Templates/Caja'

const Autocompletado = (props) => {
    return(<>
        <Caja title={props.title}>
            <FormControl variant="outlined" fullWidth>
                <Autocomplete
                    {...props}
                    getOptionLabel={(option => option[0])}
                    renderInput={(params) =>
                        <TextField {...params}
                            label={props.title}
                            variant="outlined"
                        />
                    }
                />
            </FormControl>
            <Collapse in={props.error}>
                <FormHelperText error>{props.error}</FormHelperText>
            </Collapse>
        </Caja>
    </>)
}

export default Autocompletado