import axiosClient from './axiosClient';

const calendarApi = {

    create: (data) => {
        const url = `/calendar/create`;
        return axiosClient.post(url, data)
    },

    getEvents: () => {
        const url = `/calendar/index`;
        return axiosClient.get(url)
    }
}

export default calendarApi;