import {
    user_login,
    user_loginError,
    user_loginSuccess,
    user_register
} from './../constants/user';


export const login = () => {
    return {
        type: user_login,
    }
}

export const loginSuccess = (data) => {
    return {
        type: user_loginSuccess,
        payload: data
    }
}

export const loginError = (data) => {
    return {
        type: user_loginError,
        payload: data
    }
}


export const register = (data) => {
    return {
        type: user_register,
        payload: data
    }
}