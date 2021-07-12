import {
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR
} from './../constants/category';

export const createCategoryRequest = () => {
    return {
        type: CREATE_CATEGORY_REQUEST
    }
}

export const createCategorySuccess = (data) => {
    return {
        type: CREATE_CATEGORY_SUCCESS,
        payload: data
    }
}

export const createCategoryError = (error) => {
    return {
        type: CREATE_CATEGORY_ERROR,
        payload: error
    }
}

export const getCategoriesRequest = () => {
    return {
        type: GET_CATEGORIES_REQUEST
    }
}

export const getCategoriesSuccess = (data) => {
    return {
        type: GET_CATEGORIES_SUCCESS,
        payload: data
    }
}

export const getCategoriesError = (error) => {
    return {
        type: GET_CATEGORIES_ERROR,
        payload: error
    }
}