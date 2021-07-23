import { Box, Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'

const Caja = (props) => {
    return(<>
        <Grid container
              xs={11} spacing={2}
              style={{margin: 'auto'}}>
            <Grid item
                alignItems="center" justify="center" xs={12}>
                <Paper variant="outlined">
                    <Box padding={2}>
                        <Typography>{props.title}</Typography>
                        {props.children}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    </>)
}

export default Caja