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
    const formik = useFormik({
        initialValues: {
            desde: new Date(),
            hasta: new Date()
        },
        onSubmit: (res) => {
            fetch('api/historial/', {
                method: 'POST',
                body: JSON.stringify({
                    usuario: cookies.get('usuario').usuario,
                    fechaMin: res.desde.toUTCString(),
                    fechaMax: res.hasta.toUTCString()
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }
    })

    const [items] = useState([
        {fecha: '23/06/21', cliente: 'test', respuestas: [{
            company: 'test', 
            salesman_name: 'test',
            id_cliente: 'test',
            contact: 'test',
            client_type: 'test',
            closed_sells: 'test',
            stop_selling: 'test',
            order: 'test',
            competition: 'test',
            seller_name: 'test',
            product_details: 'test',
            sample: 'test',
            comment: 'test',
        }]}
    ])

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