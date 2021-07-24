import {
    user_login,
    user_loginSuccess,
    user_loginError,
    user_register
} from '../constants/user';


const initialState = {
    error: false,
    isLoading: false,
    user: null
}


const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case user_login: {
            return {
                isLoading: true,
                ...state
            }
        }

        case user_loginSuccess: {
            const { userData, accessToken } = action.payload;
            localStorage.setItem("accessToken", accessToken);
            return {
                isLoading: false,
                user: userData,
                ...state
            }
        }

        case user_loginError: {
            return {
                ...state
            }
        }

        case user_register: {
            return {
                ...state
            }
        }

        default: return state;
    }
}

export default userReducer;