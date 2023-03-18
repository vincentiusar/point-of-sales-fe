import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteTransaction, saveTransaction } from "../redux/sliceTransaction";
import { deleteUser, saveUser } from "../redux/sliceUser";
import gado from "../asset/gado.jpg";

function Landing(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(window.location.search);
    const restaurant_id = queryParams.get('restaurant_id');
    const table_id = queryParams.get('table_id');
    const token = queryParams.get('token');

    const api_url = process.env.REACT_APP_API_URL;
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token};

    useEffect(() => {
        const handleGetFood = async () => {
            try {
                const res = await axios.get(api_url + `/restaurant/${restaurant_id}/table/${table_id}/transaction`, { headers } );

                dispatch(
                    saveUser(
                        {
                            token
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

                navigate(`/restaurant/${restaurant_id}/table/${table_id}/menu`);
            } catch (err) {
                dispatch(deleteUser()); 
                dispatch(deleteTransaction());
                console.log(err);
            }
        }
        
        handleGetFood();

        return () => {}
    }, []);

    return (
        <div className="flex items-center place-content-center p-4 w-screen h-screen">
            <div className="flex items-center gap-4 text-4xl font-bold text-blue-500">
                <img className="w-16 h-16 object-cover rounded" alt='a' src={gado} />
                Unauthorized
            </div>
        </div>
    )
}

export default Landing;