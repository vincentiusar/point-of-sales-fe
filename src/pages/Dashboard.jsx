import axios from 'axios';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function Dashboard() {

    const user = useSelector((state) => { return state.user.users });

    const api_url = process.env.REACT_APP_API_URL;
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.token};

    useEffect(() => {

        const handleFetch = async () => {
            const res = await axios.get(api_url + '', {headers});
            
            console.log(res.data);
        }
    }, []);

    return (
        <>
            
        </>
    );
}

export default Dashboard;