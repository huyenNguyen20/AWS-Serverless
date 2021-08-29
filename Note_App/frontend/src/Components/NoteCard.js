import { Card, CardContent, Grid, Icon, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

export default function NoteCard (props) {
    return(
        <Card
        style={{
            minHeight: '200px'
        }}
        >
            <CardContent>
                <div 
                style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
                >
                    <span
                    style={{
                        color: '#bbb'
                    }}
                    >
                        {props.item.category}
                    </span>
                    <span 
                    style={{marginLeft: "auto"}}>
                        <IconButton
                        onClick={() => deleteNote(props.item)}
                        >
                            <Delete style={{fontSize: '14px'}}/>
                        </IconButton>
                        <IconButton
                        onClick={() => updateNote(props.item)}
                        >
                            <Edit style={{fontSize: '14px'}}/>
                        </IconButton>
                    </span>
                </div>
                
                <Typography
                variant="h6"
                component="h2">
                    {props.item.title}
                </Typography>
                <Typography
                variant="body2"
                component="p">
                    {props.item.content}
                </Typography>
            </CardContent>
        </Card>
    )
}