import { IconButton, TableCell, TableRow } from '@material-ui/core'
import React, { useState } from 'react'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
const ItemDesp = (props) => {
    const [open, setOpen] = useState(false)
    return (<>
        <TableRow>
            <TableCell>
                <IconButton onClick={() => setOpen(!open)}>{
                    open ?
                    <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                }</IconButton>
            </TableCell>
            <TableCell>{props.item.cliente}</TableCell>
            <TableCell align="right">{props.item.fecha}</TableCell>
        </TableRow>
        {/* <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <Typography variant="h6" gutterBottom>
                            Respuestas
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableCell>Fecha y hora</TableCell>
                                <TableCell>Ref.</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell align="right">Cant.</TableCell>
                                <TableCell align="right">Stock</TableCell>
                            </TableHead>
                            <TableBody>
                            {props.respuestas.map(respuesta => {
                                return(
                                    <TableRow>
                                        <TableCell>{respuesta.}</TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow> */}
    </>)
}

export default ItemDesp