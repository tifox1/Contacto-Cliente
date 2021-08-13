import { Box, Button, Divider, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import Navegacion from './Navegacion'
import Caja from './Templates/Caja'
import DateRangeIcon from '@material-ui/icons/DateRange'
import CampoFecha from './Templates/CampoFecha'
import { useFormik } from 'formik'
import Tabla from './Templates/Tabla'
import HistoryIcon from '@material-ui/icons/History'
import ItemDesp from './Templates/ItemDesp'
import Cookies from 'universal-cookie'

const ListaEnviados = () => {
    const cookies = new Cookies()
    const [items, setItems] = useState([])

    const formik = useFormik({
        initialValues: {
            desde: new Date(),
            hasta: new Date()
        },
        onSubmit: (res) => {
            res.desde.setHours(0, 0)
            res.hasta.setHours(23, 59)
            fetch('api/historial/', {
                method: 'POST',
                body: JSON.stringify({
                    usuario: cookies.get('usuario').usuario,
                    fecha_min: res.desde.toUTCString(),
                    fecha_max: res.hasta.toUTCString()
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }
            }).then(data => {
                let items = []
                console.log(data.resultado)
                data.resultado.forEach(item => {
                    items.push({
                        fecha: item.fecha,
                        cliente: item.id_cliente,
                        respuestas: [{
                            company: item.company,
                            salesman_name: item.salesman_name,
                            contact: item.contact,
                            client_type: item.client_type,
                            closed_sells: item.closed_sells,
                            stop_selling: item.stop_selling,
                            order: item.order,
                            competition: item.competition,
                            seller_name: item.seller_name,
                            product_details: item.product_details,
                            sample: item.sample,
                            comment: item.comment,
                        }]
                    })
                })
                setItems(items)
            })
        }
    })


    return (<>
        <Navegacion back="/" title="Gestiones realizadas" />
        <Grid container component={Box} padding={1}>
            <Caja title="Rango" icon={DateRangeIcon}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <CampoFecha
                                        title="Desde"
                                        value={formik.values.desde}
                                        disableFuture
                                        onChange={date =>{
                                                formik.setFieldValue('desde', date)
                                            }
                                        }
                                    />
                                </Grid>
                                <Grid item>
                                    <CampoFecha
                                        title="Hasta"
                                        value={formik.values.hasta}
                                        disableFuture
                                        onChange={date =>
                                            formik.setFieldValue('hasta', date)
                                        }/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button color="primary" variant="contained" type="submite">
                                        aceptar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                        <Tabla
                            titulo={<>
                                <HistoryIcon /> &nbsp;
                                <h2>Historia</h2>
                            </>}
                            items={[
                                ['Desplegar', 'left'],
                                ['cliente', 'left'],
                                ['fecha', 'right']
                            ]}>{items.map(item => {
                                return (
                                    <ItemDesp item={item}/>
                                )
                            })
                        }</Tabla>
                    </Grid>
                </Grid>
            </Caja>
        </Grid>
    </>)
}

export default ListaEnviados