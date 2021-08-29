import { Grid, Typography } from "@material-ui/core";
import withAuth from "../Components/withAuth";

function MyNotes () {

    return (
        <Grid container 
        style={{
            paddingTop: '100px',
            minHeight: '30vh'
        }}
        justifyContent="center">
            <Grid item container
            style={{marginBottom: '20px'}}
            justifyContent="center">
                <Grid item>
                    <Typography variant="h4">
                        My Notes
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container
            justifyContent="center">
                
            </Grid>
        </Grid>
    )
}

export default withAuth(MyNotes, {loginRequired: true, logoutRequired: false});