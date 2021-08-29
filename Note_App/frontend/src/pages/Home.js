import {
    Grid,
    Typography
} from '@material-ui/core';
export function Home () {
    return (
        <>
            <Grid container 
            style={{
                minHeight: '30vh'
            }}
            alignItems="center"
            justifyContent="center">
                <Grid item>
                    <Typography variant="h5">
                        Welcome to Notes App!
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}