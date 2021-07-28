import { Box, Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'

const Caja = (props) => {
    return(<>
        <Grid item
              xs={12} component={Box} padding={1}>
            <Paper variant="outlined">
                <Grid container spacing={1} component={Box} padding={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">{
                            props.title
                        }</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {props.children}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </>)
}

export default Caja