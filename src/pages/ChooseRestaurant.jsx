import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadingModal } from '../components';
import { saveTransaction } from '../redux/sliceTransaction';

function ChooseRestaurant() {
    
    const user = useSelector((state) => { return state.user.users });
    const api_url = process.env.REACT_APP_API_URL;
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.token};
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [restaurants, setRestaurants] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const handleFetch = async () => {
            try {
                const res = await axios.get(api_url + `/restaurant/admin/${user.id}`, { headers });
                setRestaurants(res.data.data.items);
            } catch (err) {
                console.log(err);
            }
            setIsLoading(false);
        }

        handleFetch();
    }, []);

    const handleChoosen = (item) => {
        dispatch(saveTransaction(
            {
                transaction_id: null,
                restaurant: item,
                table_id: null,
            }
        ))
        navigate(`/restaurant/${item.id}/dashboard`);
    }

    return (
        <>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <a href="#" className="flex items-center">
                        <img src='/default.png' className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Point of Sales</span>
                    </a>
                </div>
            </nav>

            {isLoading ? 
                <LoadingModal />
                :
                <div className="flex flex-col items-center p-6">
                    <p className="text-3xl font-semibold mb-3">Please Choose Your Restaurant</p>
                    {restaurants?.map((item, key) => (
                        <div className='flex flex-col items-center gap-2 w-1/4' key={key}>
                            <button onClick={() => handleChoosen(item)} className="restaurant-button flex items-center bg-teal-500 gap-4 text-black w-full h-16 rounded-lg">
                                <img src={`${item.image}`} className="h-12 rounded-full" />
                                <p className=''>{item.name}</p>
                            </button>
                        </div>
                    ))}
                </div>
            }
        </>
    );
}

export default ChooseRestaurant;