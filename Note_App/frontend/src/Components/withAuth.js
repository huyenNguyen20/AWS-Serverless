import { CircularProgress, Grid } from "@material-ui/core";
import { getCredentials } from "../api/auth-api";
import { Redirect } from "react-router-dom";
import { Component } from "react";

export default function withAuth(
    BaseComponent, 
    {loginRequired = true, logoutRequired = false}
){
    class Comp extends Component {
        constructor(props){
            super(props);
            this.state = {
                isLoading: true,
                isAuthorized: false
            }
        } 

        componentDidMount() {
            if(getCredentials()){
                this.setState({isLoading: false, isAuthorized: true});
            } else {
                this.setState({isLoading: true, isAuthorized: true});
            }
        }

        render(){
            if(this.state.isLoading){
                return (
                    <Grid container 
                    style={{
                        minHeight: '30vh'
                    }}
                    alignItems="center"
                    justifyContent="center">
                        <Grid item>
                            <CircularProgress/>
                        </Grid>
                    </Grid>
                )
            } else if (!this.state.isAuthorized && loginRequired){
                return <Redirect to="/login"/>
            } else if (this.state.isAuthorized && logoutRequired) {
                return <Redirect to="/" />
            } else {
                return <BaseComponent {...this.props} />
            }
        }
    }
    return Comp;
}