import { CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_ERROR, GET_POSTS_SUCCESS, GET_POSTS_ERROR, GET_POSTS_REQUEST } from './../constants/post';

const initialState = {
    data: [],
    error: null,
    loading: false,
}


const postsReducer = (state = initialState, action) => {

    switch (action.type) {

        case CREATE_POST_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }

        case CREATE_POST_SUCCESS: {
            return {
                ...state,
                loading: false
            }
        }

        case CREATE_POST_ERROR: {
            return {
                ...state,
                loading: false
            }
        }

        case GET_POSTS_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }

        case GET_POSTS_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        }

        case GET_POSTS_ERROR: {
            return {
                ...state,
                loading: false
            }
        }

        default: return state;
    }
}

export default postsReducer;