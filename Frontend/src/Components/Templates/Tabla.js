import { Grid, Table, TableBody, TableCell, TableContainer, TableHead } from '@material-ui/core'
import React from 'react'

const Tabla = (props) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableCell colSpan={props.items.length}>
                        <Grid container
                            direction="row"
                            alignItems="center">
                            {props.titulo}
                        </Grid>
                    </TableCell>
                </TableHead>
                <TableHead>
                    {props.items.map(item => {
                        return (
                            <TableCell align={item[1]}>
                                {item[0]}
                            </TableCell>
                        )
                    })}
                </TableHead>
                <TableBody>{props.children}</TableBody>
            </Table>
        </TableContainer>
    )
}

export default Tabla