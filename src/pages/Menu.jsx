import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FoodCategory, FoodList, SearchBar } from "../components";
import { useNavigate } from "react-router-dom";
import { deleteOrder, saveOrder } from "../redux/sliceOrder";

function Menu(props) {
    const user = useSelector((state) => state.user.users);
    const { restaurant, table_id } = useSelector((state) => state.transaction.transaction);
    const { id: restaurant_id, name } = restaurant;
    const orders = useSelector((state) => state?.order?.orders);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const api_url = process.env.REACT_APP_API_URL;
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.token};

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [food, setFood] = useState([]);
    const [loadFood, setLoadFood] = useState(false);
    const [order, setOrder] = useState([]);
    const [totalOrder, setTotalOrder] = useState({"total": 0, "price": 0});

    const handleSearch = (e) => {
        setLoadFood(true);
        setSearch(e.target.value);
    }

    useEffect(() => {
        const unloadCallback = (event) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };

        if (totalOrder?.total > 0) {    
            window.addEventListener("beforeunload", unloadCallback);
        }

        return () => { 
            window.removeEventListener("beforeunload", unloadCallback); 
        }
    }, [totalOrder]);

    useEffect(() => {
        let total = 0, price = 0;
        order.forEach((item) => {
            total += item?.quantity;
            price += item?.price;
        });
        price = price.toLocaleString("id-ID", { 
            style: "currency",
            currency: "idr", 
        });
        setTotalOrder({"total": total, "price": price});

    }, [order, food]);

    useEffect(() => {
        setLoadFood(true);

        const handleGetFood = async () => {
            try {
                let query = search || category ? '?' : '';

                query += search ? ('search=' + search + '&') : '';
                query += category ? ('category=' + category + '&') : "";

                const res = await axios.get(api_url + `/restaurant/${restaurant_id}/food` + query, { headers } );

                setFood(res.data.data.items);
                setLoadFood(false);
            } catch (err) {
                console.log(err);
            }
        }

        const wait = setTimeout(() => {
            handleGetFood();
        }, 1000);

        return () => { clearTimeout(wait); }
    }, [search, category]);

    useEffect(() => {
        setOrder(orders);
    }, []);

    const handleOrder = () => {
        if (!totalOrder?.total) dispatch(deleteOrder());
        else dispatch(saveOrder(order));
        navigate(`/restaurant/${restaurant_id}/table/${table_id}/transaction`);
    }

    return (
        <React.Fragment>
            <SearchBar name={name} handleSearch={handleSearch} />
            <FoodCategory category={category} setCategory={setCategory} />

            <hr className="mx-4 my-2 bg-gray-500">
            </hr>

            <FoodList loadFood={loadFood} food={food} order={order} setOrder={setOrder}/>
            {totalOrder?.total > 0 || (orders.length) ? (
                <div className="absolute bottom-14 w-screen border z-10 flex items-center place-content-between">
                    <div className="flex items-center ml-2 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" className="fill-orange-500" viewBox="0 0 16 16">
                            <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0v-2z"/>
                            <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6H2.163z"/>
                        </svg>
                        <p><span className="font-bold">{Number(totalOrder.total).toString()}</span> items </p>
                    </div>
                    <div className="flex items-center gap-2">
                        Total: <span className="font-bold">{totalOrder.price}</span>
                        <button className="bg-orange-400 text-white px-5 py-3 active:bg-orange-300" onClick={handleOrder}>
                            Order
                        </button>
                    </div>
                </div>
            ) : (
                null
            )}
        </React.Fragment>
    )
}

export default Menu;