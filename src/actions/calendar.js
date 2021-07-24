import { calendar_selectRange, calendar_closeModal, calendar_getEventSuccess, calendar_createEventSuccess } from './../constants/calendar'; 

export const selectRange = (data) => {
    return {
        type: calendar_selectRange,
        payload: data
    }
}

export const closeModal = () => {
    return {
        type: calendar_closeModal
    }
}

export const getEvents = (data) => {
    return {
        type: calendar_getEventSuccess,
        payload: data
    }
}

export const createEventSuccess = (data) => {
    return {
        type: calendar_createEventSuccess,
        payload: data
    }
}