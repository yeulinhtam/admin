import { Checkbox, Grid, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { blue, green, orange, pink, red, yellow } from '@material-ui/core/colors';
import cyan from '@material-ui/core/colors/cyan';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, makeStyles, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { DateTimePicker } from "@material-ui/pickers";
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, createEventSuccess } from '../../actions/calendar';
import calendarApi from '../../api/calendarApi';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(0,171,85)',
        },
        secondary: {
            main: '#ffffff',
        },
    },
});


const styles = (theme) => ({
    root: {
        padding: '24px 24px 0px 24px',
    },
    title: {
        fontWeight: 700
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});


const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle className={classes.root} {...other}>
            <Typography className={classes.title}>{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});


const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(4),
    },
}))(MuiDialogActions);

const EventDialogCustom = withStyles((theme) => ({
    paper: {
        borderRadius: 16,
        maxWidth: 460,
    }
}))(Dialog)


const useStyles = makeStyles((theme) => ({
    row: {
        margin: theme.spacing(1, 0, 2, 0)
    }
}));


const styledBy = (property, mapping) => (props) => mapping[props[property]];

const ColorDot = withStyles({
    root: {
        padding: 5,
        opacity: 0.8,
        color: styledBy('background', {
            green: '#00AB55',
            cyan: '#1890FF',
            blue: '#04297A',
            yellow: '#FFC107',
            red: '#FF4842',
            orange: orange[700],
            pink: pink[700]
        }),
        '&:hover': {
            opacity: 0.5
        },
        '&$checked': {
            color: styledBy('background', {
                green: '#00AB55',
                cyan: '#1890FF',
                blue: '#04297A',
                yellow: '#FFC107',
                red: '#FF4842',
                orange: orange[700],
                pink: pink[700]
            }),
            opacity: 1,
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


export default function EventDialog(props) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const { isOpenModal, selectedRange } = useSelector(state => state.calendar);


    const [startTime, setStartTime] = React.useState(new Date(selectedRange.start));
    const [endTime, setEndTime] = React.useState(new Date(selectedRange.end));
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [allDay, setAllDay] = React.useState(false);


    const [colors, setColors] = React.useState([
        {
            name: "green",
            color: '#00AB55',
            checked: false
        },
        {
            name: "cyan",
            color: '#1890FF',
            checked: false
        },
        {
            name: "blue",
            color: '#04297A',
            checked: false
        },
        {
            name: "yellow",
            color: '#FFC107',
            checked: false
        },
        {
            name: "red",
            color: '#FF4842',
            checked: true
        },
        {
            name: "orange",
            color: orange[700],
            checked: false
        },
        {
            name: "pink",
            color: pink[700],
            checked: false
        }
    ]);

    useEffect(() => {
        setStartTime(new Date(selectedRange.start));
        setEndTime(new Date(selectedRange.end));
    }, [selectedRange])


    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleChange = (event) => {
        var name = event.target.name;
        var checked = event.target.checked;
        var colors = checkSelected(name, checked);
        setColors(colors);
    };


    const checkSelected = (name, checked) => {
        var outputs = [...colors];
        var count = outputs.filter(x => x.checked === true);
        var index = outputs.findIndex(x => x.name === name);

        if (count.length === 0 && index !== -1) {
            outputs[index].checked = checked;
        } else {
            if (count.length === 1) {
                var current = outputs.findIndex(x => x.checked === true);
                if (outputs[current].name === name) {
                    outputs[current].checked = checked;
                } else {
                    outputs[current].checked = false;
                    outputs[index].checked = true;
                }
            }
        }

        return outputs;
    }

    const onAddEvent = () => {
        let color = colors.filter(x => x.checked === true);

        let event = {
            title: title,
            user: "60d83f03047d2d351cdc9109",
            description: description,
            start: startTime,
            allDay: allDay,
            end: endTime,
            color: color[0].color
        };

        dispatch(closeModal());
        calendarApi.create(event).then( res => {
           dispatch(createEventSuccess(res.data))
        }).catch(err => {
            console.log(err.response);
        })
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <EventDialogCustom
                    maxWidth="md"
                    onClose={handleClose}
                    scroll='paper'
                    open={isOpenModal}>
                    <DialogTitle id="customized-dialog-title">
                        Add Event
                    </DialogTitle>
                    <DialogContent dividers={false}>
                        <Grid container direction="row">
                            <Grid item xs={12} className={classes.row}>
                                <TextField
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    label="Title" />
                            </Grid>
                            <Grid item xs={12} className={classes.row}>
                                <TextField
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    label="Descrption" />
                            </Grid>
                            <Grid item xs={12} className={classes.row}>
                                <FormControlLabel
                                    control={<Switch
                                        checked={allDay}
                                        name="checked"
                                        color="primary"
                                        onChange={(e) => setAllDay(e.target.checked)} />}
                                    label="All day"
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.row}>
                                <DateTimePicker
                                    label="Start time"
                                    inputVariant="outlined"
                                    value={startTime}
                                    fullWidth
                                    format="DD/MM/YYYY HH:mm"
                                    onChange={(date) => setStartTime(date._d)}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.row}>
                                <DateTimePicker
                                    label="End time"
                                    inputVariant="outlined"
                                    value={endTime}
                                    fullWidth
                                    format="DD/MM/YYYY HH:mm"
                                    onChange={(date) => setEndTime(date._d)}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.row}>
                                {colors.map((item, index) => {
                                    return <ColorDot
                                        key={index}
                                        checked={item.checked}
                                        onChange={handleChange}
                                        name={item.name}
                                        background={item.name}
                                        icon={<FiberManualRecordIcon style={{ fontSize: 25 }} />}
                                        checkedIcon={<CheckCircleIcon style={{ fontSize: 25 }} />}
                                    />
                                })}

                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" variant="contained" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button color="primary" variant="contained" onClick={onAddEvent}>
                            Add
                        </Button>
                    </DialogActions>
                </EventDialogCustom>
            </ThemeProvider>
        </div>
    );
}