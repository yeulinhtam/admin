import { CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_ERROR, GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_ERROR } from './../constants/post';

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


export const getPostsRequest = () => {
    return {
        type: GET_POSTS_REQUEST
    }
}

export const getPostsSuccess = (data) => {
    return {
        type: GET_POSTS_SUCCESS,
        payload: data
    }
} 


export const getPostsError = (error) => {
    return {
        type: GET_POSTS_ERROR,
        payload: error
    }
}