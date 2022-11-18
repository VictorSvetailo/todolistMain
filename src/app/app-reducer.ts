import {authAPI} from '../api/todoList-api';
import {setIsLoggedInAC} from '../features/Login/login-reducer';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        case 'SET_IS_INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }

}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET_STATUS', status} as const)

export const setAppIsInitialized = (value: boolean) => ({type: 'SET_IS_INITIALIZED', value} as const)

// export type SetAppStatusAC = {
//     type: string,
//     status: RequestStatusType
// }

// мы хотим проверить  залогированны мы или нет
export const initializedAppTC = () => (dispatch: any) => {
    authAPI.authMe()
        .then((res) => {
            //@ts-ignore
            if (res.data.resultCode === 0) {
                dispatch(setAppIsInitialized(true))
                dispatch(setIsLoggedInAC(true))
            }else{
            }
            dispatch(setAppIsInitialized(true))
        })
}
type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean,
}


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type ActionsType =
    | ReturnType<typeof setAppIsInitialized>
    | ReturnType<typeof setAppStatusAC>

