import {authAPI} from '../../api/todoList-api';
import {TasksStateType} from '../TodoLists/TodoList/Task/tasks-reducer';




const initialState: InitialStateType = {
    isLoggedIn: false
}



export const authReducer = (state = initialState, action: ActionType ) => {
    switch (action.type){
        case 'SET_LOGGED':
            return {
                ...state, isLoggedIn: action.value
            }
        default:
            return state
    }

}

export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'SET_LOGGED',
        value
    }
}


export const loginTC = (data: LoginParamsType) => (dispatch: any) => {
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0){
                dispatch(setIsLoggedInAC(true))
            }else {
                alert('test no login')
            }

        })
}

export const logoutTC = (value: boolean) => (dispatch: any) => {
    authAPI.logout()
        .then((res) => {
            dispatch(setIsLoggedInAC(value))
        })
}


type ActionType = ReturnType<typeof setIsLoggedInAC>

type InitialStateType  = {
    isLoggedIn: boolean
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
