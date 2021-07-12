import {
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
     GET_CATEGORIES_ERROR
} from '../constants/category';

const initialState = {
    data: [],
    error: null,
    loading: false,
}


const categoriesReducer = (state = initialState, action) => {

    switch (action.type) {

        case CREATE_CATEGORY_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }

        case CREATE_CATEGORY_SUCCESS: {
            let data = action.payload;
            return {
                ...state,
                data: data,
                loading: false
            }
        }

        case CREATE_CATEGORY_ERROR: {
            return {
                ...state,
                loading: false
            }
        }

        case GET_CATEGORIES_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }

        case GET_CATEGORIES_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        }

        case GET_CATEGORIES_ERROR: {
            return {
                ...state,
                loading: false
            }
        }

        default: return state;
    }
}

export default categoriesReducer;