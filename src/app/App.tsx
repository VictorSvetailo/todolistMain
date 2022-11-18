import React, {useEffect} from 'react';
import {TodoListsList} from '../features/TodoLists/TodoListsList';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {logoutTC} from '../features/Login/login-reducer';
import {AppRootStateType, useAppDispatch} from './store';
import {CircularProgress, LinearProgress} from '@mui/material';
import {useSelector} from 'react-redux';
import {initializedAppTC} from './app-reducer';




function App() {

    const dispatch = useAppDispatch()
    const logoutHandler = () => {
        dispatch(logoutTC(false))
    }



    const status = useSelector<AppRootStateType>((state) => state.app.status)

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(()=>{
        dispatch(initializedAppTC())
    },[])

    if (!isInitialized){
        return <CircularProgress style={{position: 'absolute', top: '50%', left: '50%'}}/>
    }

    return <>
        <BrowserRouter>
            <div style={{padding: '20px'}} className="App">
                {status === 'loading' && <LinearProgress/>}
                {isLoggedIn && <button onClick={logoutHandler}>Log out</button>}

                <Routes>
                    <Route path={"/"} element={<TodoListsList/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                </Routes>
            </div>
        </BrowserRouter>

    </>
}

export default App;
