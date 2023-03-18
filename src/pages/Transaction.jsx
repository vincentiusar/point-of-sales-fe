import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BotNavBar, Loading, TransactionDetail } from "../components";

function Transaction(props) {
    const user = useSelector((state) => state.user.users);
    const { transaction_id, restaurant } = useSelector((state) => state.transaction.transaction);
    const orders = useSelector((state) => state?.order?.orders);
    const { id: restaurant_id, name } = restaurant;

    const api_url = process.env.REACT_APP_API_URL;
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.token};

    const [foods, setFoods] = useState([]);
    const [previousOrder, setPreviousOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const handleGetManyFood = async () => {
            try {                
                if (orders.length) {
                    const res = await axios.post(api_url + `/restaurant/${restaurant_id}/food/many`, {foods: orders}, { headers } );
                    setFoods(res.data.data.items);
                }

                const ords = await axios.get(api_url + `/restaurant/${restaurant_id}/transaction/${transaction_id}/order`, { headers });
                setPreviousOrder(ords.data.data.items);
            } catch (err) {
                console.log(err);
            }

            setIsLoading(false);
        }
        handleGetManyFood();
        return () => { }
    }, [orders]);

    return (
        <React.Fragment>
            <div className="p-4 bg-orange-100 h-auto">
                <p className="mt-5 mx-3 font-bold text-4xl break-words line-clamp-2">{name}</p>
                <p className="mt-4 mx-3 font-semibold">Detail Transaksi</p>
            </div>
            {isLoading ? (
                <div>
                    <div className="fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto">
                        <div className="relative w-full h-full max-w-2xl">
                            <div className="relative bg-white rounded-lg shadow">
                                <div className="flex flex-col items-center p-6 space-y-6">
                                    <Loading /> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : (
                <TransactionDetail foods={foods} previousOrder={previousOrder} />
            )}
        </React.Fragment>
    )
}

export default Transaction;