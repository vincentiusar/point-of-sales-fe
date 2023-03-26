import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteTransaction, saveTransaction } from "../redux/sliceTransaction";
import { deleteUser, saveUser } from "../redux/sliceUser";

function Authenticating(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(window.location.search);
    const restaurant_id = queryParams.get('restaurant_id');
    const table_id = queryParams.get('table_id');
    const token = queryParams.get('token');

    const api_url = process.env.REACT_APP_API_URL;
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token};

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        const handleGetFood = async () => {
            try {
                const res = await axios.get(api_url + `/restaurant/${restaurant_id}/table/${table_id}/transaction`, { headers } );

                dispatch(
                    saveUser(
                        {
                            token,
                            name: null,
                            role_id: null,
                            username: null,
                            id: null,
                        }
                    )
                );
                dispatch(
                    saveTransaction(
                        {
                            transaction_id: res.data.data.id, 
                            restaurant: res.data.data.restaurant,
                            table_id: Number(table_id)
                        }
                    )
                );
                // console.log(res.data);

                navigate(`/customer/menu`);
            } catch (err) {
                dispatch(deleteUser()); 
                dispatch(deleteTransaction());
                setError(true);
                console.log(err);
            }
            setLoading(false);
        }
        
        handleGetFood();

        return () => {}
    }, []);

    return (
        <div className="flex items-center place-content-center p-4 w-screen h-screen">
            <div className="flex items-center gap-4 text-4xl font-bold text-blue-500">
                {loading ? <p>Authenticating...</p> : null}
                {error ? <p>Unauthenticated</p> : null}
            </div>
        </div>
    )
}

export default Authenticating;