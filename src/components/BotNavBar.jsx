import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function BotNavBar() {

    const { restaurant, table_id } = useSelector((state) => state.transaction.transaction);
    const { id: restaurant_id } = restaurant;

    const navigate = useNavigate();

    return (
        <>
            <div className="w-full">
                <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
                    <div id="tabs" className="flex justify-between">
                        <p className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1 focus:fill-teal-500 hover:fill-teal-500" onClick={() => { navigate(`/restaurant/${restaurant_id}/table/${table_id}/menu`); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="inline-block mb-1" viewBox="0 0 16 16">
                                <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                            </svg>
                            <span className="tab tab-home block text-xs">Menu</span>
                        </p>
                        <p className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1 focus:fill-teal-500 hover:fill-teal-500" onClick={() => { navigate(`/restaurant/${restaurant_id}/table/${table_id}/transaction`); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="inline-block mb-1" viewBox="0 0 16 16">
                                <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"/>
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                            <span className="tab tab-kategori block text-xs">Transaction</span>
                        </p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default BotNavBar;