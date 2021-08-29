import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: 'none', 
        color: '#ddd',
        "&:hover": {
            color: '#fff'
        }
    }
}))
export function Header () {
    const classes = useStyles();
    return (
        <>
          <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        <Link 
                        className={classes.link}
                        to="/">
                            NotesApp
                        </Link>
                    </Typography>
                    <span 
                    style={{
                        marginLeft: 'auto',
                        marginRight: '10px'}}>
                        <Link 
                        className={classes.link}
                        to="/login"
                        >
                        Log In
                        </Link>
                    </span> 
                    <span>
                        <Link
                         className={classes.link}
                        >
                            Log Out
                        </Link>
                       
                    </span> 
                </Toolbar>
            </AppBar>
        </>
    )
}