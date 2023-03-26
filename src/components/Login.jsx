import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveUser } from "../redux/sliceUser";

function Login({ setModal }) {

    const user = useSelector((state) => state.user.users);
    const api_url = process.env.REACT_APP_API_URL;
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.token};

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputData, setInputData] = useState({username: '', password: ''});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleInput = async (e) => {
        setInputData({...inputData, [e.target.name]: e.target.value});
    }

    const handleFlashError = async () => {
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 6000);
    }

    const loginHandle = async () => {
        setLoading(true);
        try {
            const res = await axios.post(api_url + '/login', inputData, headers);
            // console.log(res.data);
            dispatch(
                saveUser(
                    {
                        token: res.data.data.token,
                        name: res.data.data.user.name,
                        role_id: res.data.data.user.role_id,
                        username: res.data.data.user.username,
                        id: res.data.data.user.id,
                        restaurant_id: res.data.data.user.restaurant_id,
                    }
                )
            );
            // console.log(res.data);
            if (res.data.data.user.role_id === 2) { navigate('/restaurant'); return; };

            navigate(`restaurant/${res.data.data.user.restaurant_id}/dashboard`);

        } catch (err) {
            handleFlashError();
            console.log(err);
        }
        setLoading(false);
    }

    return (
        <>
            <div className="fixed top-0 z-40 w-full p-4 h-5/6 overflow-x-hidden overflow-y-auto rounded-lg">
                {error ? (
                    <div className="flex flex-col items-center">
                        <div className='fixed flex items-center gap-2 top-12 z-50 p-2 bg-red-500 rounded shadow-lg fade-in-top-down'>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 text-sm" onClick={() => setError(false)}>
                                <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <p className='text-xs text-white'>Unauthenticated. Username or Password must be wrong</p>
                        </div>
                    </div>
                ) : null }
                <div className="relative w-full h-full max-w-2xl overflow-x-hidden overflow-y-auto rounded-lg">
                    <div className="relative bg-gray-800 rounded-lg shadow">
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center py-2" onClick={() => setModal(false)}>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="flex flex-col items-center p-6 space-y-3 pt-1">
                            <p className="text-3xl text-white">Log In</p>
                            <div className="field">
                                <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"></path>
                                </svg>
                                <input autoComplete="off" placeholder="Username" className="input-field p-1 rounded" name="username" type="text" onChange={handleInput} />
                            </div>
                            <div className="field">
                                <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                                <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path></svg>
                                <input autoComplete="off" placeholder="Password" className="input-field p-1 rounded" name="password" type="password" onChange={handleInput} />
                            </div>
                            <button className="btn flex place-content-center items-center w-24" type="submit" onClick={loginHandle}>
                                {loading ? (
                                    <div>
                                        <svg aria-hidden="true" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                    </div>
                                ) : null}
                                Login
                            </button>
                            <a className="btn-link">Forgot your password?</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-40 fixed inset-0 z-30 bg-black"></div>
        </>
    );
}

export default Login;