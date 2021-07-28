import { Box, Button, Grid, TextField } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Redirect } from "react-router-dom";
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import CampoTexto from './Templates/CampoTexto'
import RadioSeleccion from './Templates/Radio'
import Seleccion from './Templates/Seleccion'
// import Autocompletado from './Templates/Autocompletado'
import Cookies from 'universal-cookie'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Formulario = (props) => {
    const cookies = new Cookies()
    const [message, setMessage] = useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessage(false)
    }
    const formik = useFormik({
        initialValues: {
            clientes: '',
            tipoContacto: '',
            tipoCliente: '',
            motDejoComprar: '',
            cerrasteVenta: '',
            comproProducto: '',
            quienCompra: '',
            detProducto: '',
            muestra: '',
            comentarios: '',
            otherComproProducto: '',
            otherQuienCompra: '',
        },
        onSubmit: (value, {resetForm}) => {
            // alert(JSON.stringify(value))
            fetch('http://192.168.100.190:8000/api/formulario/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    salesman_name: cookies.get('usuario').usuario,
                    contact: value.tipoContacto,
                    client_type: value.tipoCliente,
                    stop_selling: value.motDejoComprar,
                    order: value.cerrasteVenta,
                    seller_name: value.quienCompra,
                    product_details: value.detProducto,
                    sample: value.muestra,
                    comment: value.comentarios,
                    id_cliente: value.clientes,
                    closed_sells: value.cerrasteVenta,
                    competition: value.comproProducto,
                    other_seller: value.otherQuienCompra,
                    other_competition: value.otherComproProducto
                })
            }).then(response => {
                if (response.ok) {
                    console.log('enviado')
                    resetForm()
                    setMessage(true)
                }
            })
        },
        validationSchema: Yup.object({
            clientes: Yup.string().required('Ingrese el cliente'),
            tipoContacto: Yup.string().required('Ingrese medio de contacto'),
            tipoCliente: Yup.string().required('Ingrese tipo de cliente'),
            cerrasteVenta: Yup.string().required('Ingrese si cerró una venta'),
            otherComproProducto: Yup.string().when('comproProducto', {
                is: 'other',
                then: Yup.string().required('Especifique otro producto')
            }),
            otherQuienCompra: Yup.string().when('quienCompra', {
                is: 'other',
                then: Yup.string().required('Especifique otro proveedor')
            })
        })
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            {message ? <Redirect to="/" /> : null}
            <Grid container component={Box} padding={1}>
                <Seleccion title="Cliente"
                    options={props.clientes}
                    name="clientes"
                    value={formik.values.clientes}
                    onChange={formik.handleChange}
                    error={formik.errors.clientes}
                    errorText={formik.errors.clientes}
                />
                {/* <Autocompletado
                    name="clientes"
                    options={props.clientes}
                    title="Clientes"
                    value={formik.values.clientes}
                    onChange={formik.setFieldValue}
                /> */}
                <RadioSeleccion title="¿Por qué medio contactaste?"
                    options={[
                        ['Visita al Cliente', 'Visita al Cliente'],
                        ['Whatsapp', 'Whatsapp'],
                        ['Llamada', 'Llamada'],
                        ['Correo Electronico', 'Correo Electronico'],
                        ['Visito Segupak', 'Visito Segupak'],
                    ]}
                    name="tipoContacto"
                    value={formik.values.tipoContacto}
                    onChange={formik.handleChange}
                    error={formik.errors.tipoContacto}
                    errorText={formik.errors.tipoContacto}
                />
                <RadioSeleccion title="Tipo de cliente"
                    options={[
                        ['Habitual', 'Habitual'],
                        ['Dejo de Comprar', 'Dejo de Comprar'],
                        ['En gestion de compra', 'En gestion de compra'],
                        ['Casual', 'Casual'],
                    ]}
                    name="tipoCliente"
                    value={formik.values.tipoCliente}
                    onChange={formik.handleChange}
                    error={formik.errors.tipoCliente}
                    errorText={formik.errors.tipoCliente}
                />
                <RadioSeleccion title="¿Porqué dejó de comprar?"
                    options={[
                        ['Precio', 'Precio'],
                        ['Producto Faltante', 'Producto Faltante'],
                    ]}
                    name="motDejoComprar"
                    value={formik.values.motDejoComprar}
                    onChange={formik.handleChange}
                />
                <RadioSeleccion title="¿Cerraste una venta?"
                    options={[
                        ['Si', 'Si'],
                        ['No', 'No'],
                        ['Cotizacion', 'Cotizacion'],
                    ]}
                    name="cerrasteVenta"
                    value={formik.values.cerrasteVenta}
                    onChange={formik.handleChange}
                    error={formik.errors.cerrasteVenta}
                    errorText={formik.errors.cerrasteVenta}
                />
                <RadioSeleccion title="Compró algún producto de la competencia?"
                    options={[
                        ['Cintas', 'Cintas'],
                        ['FILM', 'FILM'],
                        ['FLEJES', 'FLEJES'],
                        ['POF', 'POF'],
                    ]}
                    renderOther={true}
                    otherName="otherComproProducto"
                    otherValue={formik.values.otherComproProducto}
                    otherError={formik.errors.otherComproProducto}
                    name="comproProducto"
                    value={formik.values.comproProducto}
                    onChange={formik.handleChange}
                />
                <RadioSeleccion title="¿De quién compra?"
                    options={[
                        ['Cintas S.A.', 'Cintas S.A.'],
                        ['FONDO ESTRELLA S.A.', 'FONDO ESTRELLA S.A.'],
                        ['PARPACK S.A', 'PARPACK S.A.'],
                    ]}
                    renderOther={true}
                    otherName="otherQuienCompra"
                    otherValue={formik.values.otherQuienCompra}
                    otherError={formik.errors.otherQuienCompra}
                    name="quienCompra"
                    value={formik.values.quienCompra}
                    onChange={formik.handleChange}
                />
                <CampoTexto
                    title="Detalle del producto de la competencia"
                    name="detProducto"
                    value={formik.values.detProducto}
                    onChange={formik.handleChange}
                />
                <RadioSeleccion title="¿Conseguiste una muestra?"
                    options={[
                        ['Si', 'Si'],
                        ['No', 'No'],
                    ]}
                    name="muestra"
                    value={formik.values.muestra}
                    onChange={formik.handleChange}
                />
                <CampoTexto
                    title="Comentarios"
                    name="comentarios"
                    value={formik.values.comentarios}
                    onChange={formik.handleChange}
                />
                <Grid component={Box} padding={1}>
                    <Button type="submit"  color="primary" variant="contained">Enviar</Button>
                </Grid>
            </Grid>

            <Snackbar open={message} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Tu formulario ha sido enviado!
                </Alert>
            </Snackbar>
        </form>
    )
}

export default Formulario

