import { calendar_selectRange, calendar_closeModal, calendar_getEventSuccess, calendar_createEventSuccess } from '../constants/calendar';

const date = new Date();
const startTime = date.getTime();
const endTime = startTime + 86400000;

const initialState = {
    events: [],
    error: false,
    isLoading: false,
    isOpenModal: false,
    selectedEventId: null,
    selectedRange: {
        start: startTime,
        end: endTime
    }
}


const calendarReducer = (state = initialState, action) => {

    switch (action.type) {

        case calendar_selectRange: {
            let { startTime, endTime } = action.payload;
            return {
                ...state,
                selectedRange: {
                    start: startTime,
                    end: endTime
                },
                isOpenModal: true
            }
        }

        case calendar_closeModal: {
            return {
                ...state,
                isOpenModal: false
            }
        }

        case calendar_getEventSuccess: {
            let data = action.payload;
            return {
                ...state,
                events: data
            }
        }

        case calendar_createEventSuccess: {
            let events = [...state.events];
            let data = action.payload;
            events.push(data);

            return {
                ...state,
                events: events
            }
        }

        default: return state;
    }
}

export default calendarReducer;