import { Box, Button, Grid } from '@material-ui/core'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import CampoTexto from './Templates/CampoTexto'
import RadioSeleccion from './Templates/Radio'
import Seleccion from './Templates/Seleccion'
// import { useFormik } from 'formik'

const Formulario = () => {
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
        onSubmit: value => {
            console.log(value)
            fetch('http://0.0.0.0:8000/api/usuarioread', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientes: value.clientes,
                    tipocliente: value.tipocliente,
                    cerrasteventa: value.cerrasteventa,
                })
            })
        },
        // validationSchema: Yup.object({
        //     clientes: Yup.string().required(''),
        //     tipocliente: Yup.string().required(''),
        //     cerrasteventa: Yup.string().required(''),
        // })
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <Grid container component={Box} padding={1}>
                <Seleccion title="Cliente"
                    options={[
                        ['0', 'cero'],
                        ['1', 'uno']
                    ]}
                    name="clientes"
                    value={formik.values.clientes}
                    onChange={formik.handleChange}/>
                <RadioSeleccion title="¿Por qué medio contactaste?"
                    options={[
                        ['Visita al Cliente','Visita al Cliente'],
                        ['Whatsapp','Whatsapp'],
                        ['Llamada','Llamada'],
                        ['Correo Electronico','Correo Electronico'],
                        ['Visito Segupak','Visito Segupak'],
                    ]}
                    name="tipoContacto"
                    value={formik.values.tipoContacto}
                    onChange={formik.handleChange}
                />
                <RadioSeleccion title="Tipo de cliente"
                    options={[
                        ['Habitual','Habitual'],
                        ['Dejo de Comprar','Dejo de Comprar'],
                        ['En gestion de compra','En gestion de compra'],
                        ['Casual','Casual'],
                    ]}
                    name="tipoCliente"
                    value={formik.values.tipoCliente}
                    onChange={formik.handleChange}
                />
                <RadioSeleccion title="¿Porqué dejó de comprar?"
                    options={[
                        ['Precio','Precio'],
                        ['Producto Faltante','Producto Faltante'],
                    ]}
                    name="motDejoComprar"
                    value={formik.values.motDejoComprar}
                    onChange={formik.handleChange}
                />
                <RadioSeleccion title="¿Cerraste una venta?"
                    options={[
                        ['Si','Si'],
                        ['No','No'],
                        ['Cotizacion','Cotizacion'],
                    ]}
                    name="cerrasteVenta"
                    value={formik.values.cerrasteVenta}
                    onChange={formik.handleChange}
                />
                <RadioSeleccion title="Compró algún producto de la competencia?"
                    options={[
                        ['Cintas','Cintas'],
                        ['FILM','FILM'],
                        ['FLEJES','FLEJES'],
                        ['POF','POF'],
                    ]}
                    renderOther={true}
                    otherName="otherComproProducto"
                    otherValue={formik.values.otherComproProducto}
                    name="comproProducto"
                    value={formik.values.comproProducto}
                    onChange={formik.handleChange}
                />
                <RadioSeleccion title="¿De quién compra?"
                    options={[
                        ['Cintas S.A.','Cintas S.A.'],
                        ['FONDO ESTRELLA S.A.','FONDO ESTRELLA S.A.'],
                        ['PARPACK S.A','PARPACK S.A.'],
                    ]}
                    renderOther={true}
                    otherName="otherQuienCompra"
                    otherValue={formik.values.otherQuienCompra}
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
                        ['Si','Si'],
                        ['No','No'],
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
                    <Button type="submit" color="primary" variant="contained">Enviar</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default Formulario

