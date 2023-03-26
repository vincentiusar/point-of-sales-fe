import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loading, LoadingModal, TransactionDetail } from "../components";

function Transaction(props) {
    const user = useSelector((state) => state.user.users);
    const { transaction_id, restaurant } = useSelector((state) => state.transaction.transaction);
    const orders = useSelector((state) => state?.order?.orders);
    const { id: restaurant_id, name, images } = restaurant;

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
            <div className={`p-4 ${images ? 'text-white' : 'text-black'} bg-orange-100 h-auto`} style={images ? {background: `linear-gradient(rgb(0 0 0 / 0.5), rgb(0 0 0 / 0)), url(${images})`, backgroundSize: '100%', backgroundRepeat: "no-repeat"} : null}>
                <p className="mt-5 mx-3 font-bold text-4xl break-words line-clamp-2">{name}</p>
                <p className="mt-4 mx-3 font-semibold">Detail Transaksi</p>
            </div>
            {isLoading ? (
                <LoadingModal />
            ) : (
                <TransactionDetail foods={foods} previousOrder={previousOrder} />
            )}
        </React.Fragment>
    )
}

export default Transaction;