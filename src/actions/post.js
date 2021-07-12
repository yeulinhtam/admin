import { CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_ERROR } from './../constants/post';

export const createPostRequest = () => {
    return {
        type: CREATE_POST_REQUEST
    }
}

export const createPostSuccess = (data) => {
    return {
        type: CREATE_POST_SUCCESS,
        payload: data
    }
}

export const createPostError = (error) => {
    return {
        type: CREATE_POST_ERROR,
        payload: error
    }
}