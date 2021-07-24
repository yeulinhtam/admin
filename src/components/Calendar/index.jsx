import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EventDialog from './EventDialog';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import './calendar.css';
import { selectRange } from '../../actions/calendar';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(5),
    },
})
);


function Calendar(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { events } = useSelector(state => state.calendar);

    const handleDateClick = (arg) => {
        let { date }  = arg;
       
        const time = new Date(date);
        const startTime = time.getTime();
        const endTime = startTime + 86400000;

        dispatch(selectRange({startTime, endTime}));
    }


    return (
        <Grid container className={classes.container}>
            <Grid item lg={12}>
                <Paper className={classes.paper}>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        dateClick={handleDateClick}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth'
                          }}
                        eventAdd
                        dayMaxEventRows={3}
                        events={events}
                    />
                </Paper>
            </Grid>
            <EventDialog />
        </Grid>
    );
}

export default Calendar;