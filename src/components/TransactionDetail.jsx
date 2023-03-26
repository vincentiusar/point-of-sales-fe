import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, saveOrder } from "../redux/sliceOrder";
import Loading from "./Loading";
import gado from "../asset/gado.jpg";

function TransactionDetail({foods, previousOrder}) {
    const user = useSelector((state) => state.user.users);
    const { transaction_id, restaurant } = useSelector((state) => state.transaction.transaction);
    const orders = useSelector((state) => state?.order?.orders);
    const { id: restaurant_id, } = restaurant;
    
    const dispatch = useDispatch();

    const [total, setTotal] = useState({ 'all': 0, 'current': 0 });
    const [order, setOrder] = useState([]);
    const [isLoadingOrder, setIsLoadingOrder] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editFood, setEditFood] = useState([]);

    const api_url = process.env.REACT_APP_API_URL;
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.token};

    useEffect(() => {
        fetch();

        return () => { }
    }, [orders]);

    const fetch = async () => {
        const res = [];
        let totalCurrent = 0;

        orders?.map((item) => {
            totalCurrent += item?.price;

            item = {...item};
            previousOrder = [...previousOrder];
            previousOrder.forEach((ord, key) => {
                if (item.food_id === ord.food.id) {
                    item.quantity += ord.quantity;

                    if (item.note === '') {
                        item.note = ord.note;
                    }
                    
                    previousOrder.splice(key, 1);
                }
            });
            foods?.map((food) => {
                if (item.food_id === food.id) {
                    item.name = food.name;
                    item.food_quantity = food.quantity;
                    item.price = food.price * item.quantity;
                }
            });

            res.push(item);
        });

        previousOrder?.map((item) => {
            res.push(
                {
                    food_id: item.food?.id,
                    note: item.note,
                    name: item.food?.name,
                    quantity: item.quantity,
                    price: item.total
                }
            );
        });

        let totalAll = 0;
        res.map((item) => {
            totalAll += Number(item?.price);
        });

        setTotal({...total, all: totalAll, current: totalCurrent});
        setOrder(res);
    }

    const openModal = async () => {
        const res = [];

        orders?.map((item) => {
            res.push({...item});
        });
        
        setEditFood(res);
        setModalOpen(true);
    }

    const handleCancel = async () => {
        setModalOpen(false);
    }

    const handleOk = async () => {
        const res = [];

        editFood.map((item, key) => {
            if (item.quantity > 0) {
                res.push({...item});
            }
        });

        dispatch(saveOrder(res));

        setModalOpen(false);
    }

    const handleQuantity = (e, item, key) => {
        const price = item[key].price / item[key].quantity;

        if (Number(e.target.value) > Number(e.target.max)) {
            item = [...item];

            item[key].quantity = e.target.max;
            item[key].price = price * e.target.max;
            setEditFood(item);
            
            return;
        }
        
        if (e.target.value < 0) {
            item = [...item];
            item[key].quantity = 0;
            item[key].price = 0;
            setEditFood(item);
            
            return;
        }

        item = [...item];
        item[key].price = price * Number(e.target.value);
        item[key].quantity = Number(e.target.value);
        setEditFood(item);
    }

    const incrementQuantity = (item, key) => {
        const price = item[key].price / item[key].quantity;

        if (Number(item[key].quantity) >= item[key].food_quantity) {
            return;
        }

        item = [...item];
        item[key].price = price * (item[key].quantity+1);
        item[key].quantity = item[key].quantity+1;
        setEditFood(item);
    }

    const decrementQuantity = (item, key) => {
        const price = item[key].price / item[key].quantity;

        if (Number(item[key].quantity) === 0) {
            return;
        }
        item = [...item];
        item[key].price = price * (item[key].quantity-1);
        item[key].quantity = item[key].quantity-1;

        setEditFood(item);
    }

    const handleSubmit = async () => {
        setIsLoadingOrder(true);
        try {
            await axios.post(api_url + `/restaurant/${restaurant_id}/transaction/${transaction_id}/order/add`, {orders: order}, { headers });

            dispatch(deleteOrder());
            await fetch();
        } catch (err) {
            console.log(err);
        }
        setIsLoadingOrder(false);
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center w-screen mt-3 relative overflow-x-auto">
                <h3 className="text-xl font-semibold">Total Transaction</h3>
                <table className="w-11/12 text-sm text-left text-gray-700 mb-4">
                    <thead className="text-xs text-gray-700 uppercase bg-amber-300">
                        <tr>
                            <th scope="col" className="px-2 py-3">Item</th>
                            <th scope="col" className="px-2 py-3">Qty</th>
                            <th scope="col" className="px-2 py-3">Sub Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.map((item, key) => (
                            <tr className={`${key % 2 ? "bg-gray-50" : "bg-gray-100"} border-b`} key={key}>
                                <th scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap`}>
                                    <p className="font-bold">{item?.name}</p>
                                    <p className="opacity-60">{item?.note}</p>
                                </th>
                                <td className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap`}>{item?.quantity}</td>
                                <td className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap`}>{Number(item?.price).toLocaleString("id-ID", { style: "currency", currency: "idr", })}</td>
                            </tr>
                        ))}
                        <tr className="border-b bg-gray-300">
                                <th scope="row">
                                </th>
                                <td className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap`}>Total</td>
                                <td className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap`}>{total?.all.toLocaleString("id-ID", { style: "currency", currency: "idr", })}</td>
                        </tr>
                    </tbody>
                </table>
                {orders.length && previousOrder.length ? (
                    <>
                        <h3 className="text-xl font-semibold">New Order</h3>
                        <table className="w-11/12 text-sm text-left text-gray-700 mb-4">
                            <thead className="text-xs text-gray-700 uppercase bg-amber-300">
                                <tr>
                                    <th scope="col" className="px-2 py-3">Item</th>
                                    <th scope="col" className="px-2 py-3">Qty</th>
                                    <th scope="col" className="px-2 py-3">Sub Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((item, key) => (
                                    <tr className={`${key % 2 ? "bg-gray-50" : "bg-gray-100"} border-b`} key={key}>
                                        <th scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap`}>
                                            <p className="font-bold">{item?.name}</p>
                                            <p className="opacity-60">{item?.note}</p>
                                        </th>
                                        <td className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap`}>{item?.quantity}</td>
                                        <td className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap`}>{Number(item?.price).toLocaleString("id-ID", { style: "currency", currency: "idr", })}</td>
                                    </tr>
                                ))}
                                <tr className="border-b bg-gray-300">
                                        <th scope="row">
                                        </th>
                                        <td className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap`}>Total</td>
                                        <td className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap`}>{total?.current.toLocaleString("id-ID", { style: "currency", currency: "idr", })}</td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                ) : 
                    null
                }
            </div>
            <div className="flex gap-4">
                <button className="bg-teal-400 rounded text-white px-5 py-3 active:bg-orange-300 disabled:bg-gray-300" disabled={!orders.length} onClick={openModal}>
                    Edit
                </button>
                <button className="bg-orange-400 rounded text-white px-5 py-3 active:bg-orange-300 disabled:bg-gray-300" disabled={!orders.length} onClick={handleSubmit}>
                    Order
                </button>
            </div>

            {isLoadingOrder ? 
                <div className="absolute top-1/2 left-0">
                    <div className="fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto">
                        <div className="relative w-full h-full">
                            <div className="relative bg-white rounded-lg shadow">
                                <div className="flex flex-col items-center p-6 space-y-6">
                                    <Loading /> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
                </div>
            : null}
            {modalOpen ? (
                <>
                    <div className="fixed top-0 left-0 right-0 z-40 w-full p-4 h-5/6 overflow-x-hidden overflow-y-auto rounded-lg">
                        <div className="relative w-full h-full max-w-2xl overflow-x-hidden overflow-y-auto rounded-lg">
                            <div className="relative bg-white rounded-lg shadow">
                                <div className="flex items-start sticky top-0 z-50 bg-white justify-between p-4 border-b rounded-t">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        Edit Order
                                    </h3>
                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={handleCancel}>
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="flex flex-col items-center p-6 space-y-6">
                                    {editFood?.map((item, key) => (
                                        <div key={key} className="flex flex-col items-center gap-1 border shadow rounded">
                                            <img className="w-full rounded-t" alt="a" src={gado} />
                                            <div className="flex flex-col items-center p-3">
                                                <div className="flex flex-col gap-3 items-center">
                                                    <p className="text-xl leading-relaxed text-gray-500 font-bold">
                                                        {item.name}
                                                    </p>
                                                    <div className="flex items-center gap-3">
                                                        <button className="rounded font-bold text-xl h-8 w-8 text-orange-500 border-2 border-orange-500 bg-white" onClick={() => decrementQuantity(editFood, key)}> - </button>
                                                        <input className="border border-black rounded w-14 text-center p-1" type="number" value={Number(editFood[key].quantity).toString()} min="1" max={item.food_quantity} onChange={(e) => handleQuantity(e, editFood, key)} />
                                                        <button className="rounded font-semibold text-xl h-8 w-8 text-white bg-orange-500" onClick={() => incrementQuantity(editFood, key)}> + </button>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <input type='text' className="w-full h-12 py-1 px-2 border rounded border-black" placeholder={`Catatan: "Tanpa Daun Bawang"`} value={editFood[key]?.note} onChange={(e) => { const note = e.target.value; const item = [...editFood]; item[key].note = note; setEditFood(item); }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center sticky z-50 bg-white bottom-0 p-6 space-x-2 border-t border-gray-200 rounded-b">
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400" onClick={(e) => handleOk(e)}>Order</button>
                                    <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-40 fixed inset-0 z-30 bg-black"></div>
                </> 
            ) : null}
        </div>
    );
}

export default TransactionDetail;