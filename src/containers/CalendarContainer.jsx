import React, { useEffect } from 'react';
import Calendar from './../components/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../api/calendarApi';
import { getEvents } from '../actions/calendar';



function CalendarContainer(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        calendarApi.getEvents().then(res => {
           dispatch(getEvents(res.data))
        })
    },[dispatch]);


    return (
        <Calendar />
    );
}

export default CalendarContainer;