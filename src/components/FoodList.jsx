import React, { useEffect, useState } from "react";
import gado from '../asset/gado.jpg';
import Loading from "./Loading";

function FoodList({ loadFood, food, order, setOrder }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [note, setNote] = useState('');
    const [foodQuantity, setFoodQuantity] = useState(new Map());

    useEffect(() => {
        order?.forEach((item) => {
            food.forEach((f) => {
                item = {...item}; 
                f = {...f};
                if (item.food_id === f.id) {
                    if (!foodQuantity.has(item.food_id)) {
                        foodQuantity.set(item.food_id, item.quantity);
                    }
                    setFoodQuantity(foodQuantity);
                }
            })
        });
    }, [order, food]);

    const handleOpenModal = (e, item) => {
        order?.forEach(food => {
            if (food.food_id === item.id) {
                setQuantity(food.quantity);
                setNote(food.note);
            } 
        });
        setIsModalOpen(item);
    }
    
    const handleOk = (e, food) => {
        let isFound = false;

        const res = [...order];
        res?.forEach((item, key) => {
            item = {...item};
            if (item.food_id === food.id) {
                isFound = true;
                
                item.name = food.name;
                item.quantity = quantity;
                item.note = note;
                item.price = quantity * isModalOpen.price;
                item.food_quantity = food.quantity

                if (!quantity) res.splice(key, 1);
                else {
                    res[key] = item;
                }
                setOrder(res);
                
                return;
            }
        });

        
        if (!isFound) {
            setOrder([...order, {name: food.name, food_id: food.id, food_quantity: food.quantity, quantity, note: note, price: quantity * isModalOpen.price}])
        }

        foodQuantity.set(food.id, quantity);
        setFoodQuantity(foodQuantity);

        setNote('');
        setQuantity(0);
        setIsModalOpen(false);
    };
    
    const handleCancel = () => {
        setNote('');
        setQuantity(0);
        setIsModalOpen(false);
    };

    const handleQuantity = (e) => {
        if (Number(e.target.value) > Number(e.target.max)) {
            setQuantity(e.target.max); return;
        }
        
        if (e.target.value < 0) {
            setQuantity(0); return;
        }

        setQuantity(Number(e.target.value));
    }

    const incrementQuantity = (e, food) => {
        if (Number(quantity) >= food.quantity) {
            return;
        }
        setQuantity(quantity+1);
    }

    const decrementQuantity = () => {
        if (Number(quantity) === 0) {
            return;
        }
        setQuantity(quantity-1);
    }

    const handleNote = (e) => {
        setNote(e.target.value)
    }

    return (
        <React.Fragment>
            <div className="mt-4 mx-5 grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 gap-4">
                {
                    loadFood ? 
                    (
                        <div className="w-full col-span-2 flex flex-col items-center">
                            <Loading />
                        </div>
                    )
                        :
                    food?.map((item, key) => (
                        <div className="max-w-sm rounded overflow-hidden shadow-lg active:shadow-lg active:shadow-blue-400" key={key} onClick={isModalOpen || item?.quantity === 0 ? null : (e) => handleOpenModal(e, item)}>
                            <img className="w-full" alt="a" src={gado} />
                            <div className="px-4 py-4 pb-5">
                                <div className="font-bold text-xl mb-2 line-clamp-2">{item?.name}</div>
                                <p className="text-gray-700 text-base line-clamp-1">{item?.description}</p>
                                <p className="fond-semibold bg-orange-300 px-2 w-fit rounded-lg text-white text-base line-clamp-1">{Number(item?.price).toLocaleString("id-ID", { style: "currency", currency: "idr", })}</p>
                            </div>
                            {foodQuantity.get(Number(item.id)) > 0 ? (
                                <div className="px-6 pt-1">
                                    <p className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Ordered: {foodQuantity.get(Number(item.id)) ?? 0}</p>
                                </div>
                            ) : null}
                            {Number(item?.quantity) > 0 ? 
                                null :
                                <div className="px-6 pt-1">
                                    <p className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">Out of Stock</p>
                                </div>
                            }
                            <div className="px-6 pt-1 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{item.category}</span>
                            </div>
                        </div>
                    ))
                }
                {isModalOpen ?
                    <>
                        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto">
                            <div className="relative w-full h-full max-w-2xl">
                                <div className="relative bg-white rounded-lg shadow">
                                    <div className="flex items-start justify-between p-4 border-b rounded-t">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Order?
                                        </h3>
                                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={handleCancel}>
                                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className="flex flex-col items-center p-6 space-y-6">
                                        <img className="w-full" alt="a" src={gado} />
                                        <div className="flex flex-col items-center">
                                            <p className="text-base leading-relaxed text-gray-500 font-bold">
                                                {isModalOpen.name}
                                            </p>
                                            <p className="text-base leading-relaxed text-gray-500 ">
                                                {isModalOpen.description}
                                            </p>
                                            <p className="fond-semibold bg-orange-300 px-2 w-full text-center rounded-lg text-white text-base line-clamp-1">{Number(isModalOpen?.price).toLocaleString("id-ID", { style: "currency", currency: "idr", })}</p>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <button className="rounded font-bold text-xl h-8 w-8 text-white bg-red-500" onClick={decrementQuantity}> - </button>
                                            <input className="border border-black rounded w-14 text-center p-1" type="number" value={Number(quantity).toString()} min="1" max={isModalOpen.quantity} onChange={handleQuantity} />
                                            <button className="rounded font-bold text-xl h-8 w-8 text-white bg-blue-500" onClick={(e) => incrementQuantity(e, isModalOpen)}> + </button>
                                            <p>Max: {isModalOpen.quantity}</p>
                                        </div>
                                        <div className="flex gap-4 items-center my-2">
                                            <p>Catatan</p>
                                            <p>:</p>
                                            <input className="rounded h-8 w-full mx-4 border border-black p-2" type="text" value={note} placeholder={`ex: Tanpa Daun Bawang`} onChange={handleNote} />
                                        </div>
                                    </div>
                                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                                        {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400" disabled={quantity === 0} onClick={(e) => handleOk(e, isModalOpen)}>Order</button> */}
                                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400" disabled={note && !quantity} onClick={(e) => handleOk(e, isModalOpen)}>Order</button>
                                        <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" onClick={handleCancel}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
                    </> 
                    : 
                        null
                    }
                {/* <div className="text-xl mx-4">
                    Sorry, No food {search ? `with name ${search}` : ``} {category ? (search ? (`and`) : '') + `with Category ${category} found` : ('')}
                </div> */}
            </div>
        </React.Fragment>
    );
}

export default FoodList;