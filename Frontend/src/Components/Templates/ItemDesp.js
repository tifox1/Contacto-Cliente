import {
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    TableCell,
    TableRow
} from '@material-ui/core'
import React, { useState } from 'react'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
const ItemDesp = (props) => {
    const [open, setOpen] = useState(false)
    const titulos = [
        ['contact', '¿Por qué medio contactaste?'],
        ['client_type', 'Tipo de cliente'],
        ['stop_selling', '¿Porqué dejó de comprar?'],
        ['closed_sells', '¿Cerraste una venta?'],
        ['competition', 'Compró algún producto de la competencia?'],
        ['seller_name', '¿De quién compra?'],
        ['product_details', 'Detalle del producto de la competencia'],
        ['sample', '¿Conseguiste una muestra?'],
        ['comment', 'Comentarios']
    ]

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
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List
                        aria-labelledby="subheader"
                        subheader={
                            <ListSubheader id="subheader">
                                Respuestas
                            </ListSubheader>
                        }
                    >
                        {props.item.respuestas.map(respuesta => {
                            return (titulos.map(titulo => {
                                console.log(respuesta[titulo[0]])
                                return (<>
                                    <ListItem>
                                        <ListItemText
                                            primary={titulo[1]}
                                            secondary={`${respuesta[titulo[0]]} ${titulos.indexOf(titulo)}`}
                                        />
                                    </ListItem>
                                </>)
                            }))
                        })}
                    </List>
                </Collapse>
            </TableCell>
        </TableRow>
    </>)
}

export default ItemDesp