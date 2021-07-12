import axiosClient from './axiosClient';

const postApi = {

    create: (data) => {
        const url = `/posts/create`;
        return axiosClient.post(url, data)
    },

    getPosts: () => {
        const url = `/posts/`;
        return axiosClient.get()
    }
}

export default postApi;