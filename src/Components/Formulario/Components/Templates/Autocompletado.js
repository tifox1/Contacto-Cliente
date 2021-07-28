import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
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
                <FormHelperText error>{props.errorText}</FormHelperText>
            </FormControl>
        </Caja>
    </>)
}

export default Autocompletado