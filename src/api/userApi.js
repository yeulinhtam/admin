import axiosClient from './axiosClient';

const userApi = {

    create: (data) => {
        const url = `/user/create`;
        return axiosClient.post(url, data)
    },

    login: (data) => {
        const url = `/user/login`;
        return axiosClient.post(url,data)
    }
}

export default userApi;