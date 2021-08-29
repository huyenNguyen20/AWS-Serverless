import { Button, Grid } from "@material-ui/core";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../api/auth-api";

export function Login () {
    const [shouldRedirect, setShoudRedirect] = useState(false);

    const logUserIn = async () => {
        await login().then((data) => {
            setShoudRedirect(true);
        })
    }
    if(shouldRedirect) return <Redirect to="/notes" />
    else return (
        <Grid container 
        style={{
            minHeight: '30vh'
        }}
        alignItems="center"
        justifyContent="center">
            <Grid item>
                <Button
                variant="contained"
                color="primary"
                onClick={logUserIn}
                >
                    Login with Google
                </Button>
            </Grid>
        </Grid>
    )
}