import { Box, Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'

const Caja = (props) => {
    return(<>
        <Grid item
              xs={12} component={Box} padding={1}>
            <Paper variant="outlined">
                <Box padding={2}>
                    <Typography variant="h6">{
                        props.title
                    }</Typography>
                    {props.children}
                </Box>
            </Paper>
        </Grid>
    </>)
}

export default Caja