import axiosClient from './axiosClient';

const categoryApi = {

    create: (data) => {
        const url = `/categories/create`;
        return axiosClient.post(url, data)
    },

    getCategories: () => {
        const url = `/categories`;
        return axiosClient.get(url);
    }
}

export default categoryApi;