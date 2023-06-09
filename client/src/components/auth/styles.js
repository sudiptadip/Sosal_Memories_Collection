import { makeStyles } from "@material-ui/core/styles";


export default makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2)
    },
    root: {
        '& .MuiTextFiled-root': {
            margin: theme.spacing(1)
        },
    },
    avtar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        margin: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    googleButon: {
        marginBottom: theme.spacing(2)
    }
}))