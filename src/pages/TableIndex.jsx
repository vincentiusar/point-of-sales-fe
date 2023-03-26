import { Breadcrumb, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function TableIndex() {
    const token = useSelector((state) => { return state.user.users.token; });
    const { restaurant } = useSelector((state) => state.transaction.transaction);
    const { id: restaurant_id } = restaurant;

    const api_url = process.env.REACT_APP_API_URL;
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token};
    
    const [tables, setTables] = useState([]);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const handleFetch = async () => {
            try {
                let url = api_url + `/restaurant/${restaurant_id}/table`;

                if (status) url += `?status=${status}`;
                
                const res = await axios.get(url, { headers });
                setTables(res.data.data.items);
            } catch (err) {
                console.log(err);
            }
        }

        handleFetch();
    }, [status]);

    const onChangeCheck = (e) => {
        setStatus(e);
    }

    return (
        <div className="w-full p-4 overflow-y-auto">
            <p className='text-4xl font-semibold bg-white p-5 rounded'>Tables</p>

            <section className='py-1' />

            <Breadcrumb className='px-2'>
                <Breadcrumb.Item>Tables</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>

            <section className='py-1' />
            
            <div className="flex flex-col items-end w-full">
                <div className='flex items-center gap-4'>
                    <div className="flex items-center gap-1">
                        <div className="bg-blue-500 text-white font-bold py-2 px-3 border-b-4 border-blue-700 rounded" />
                        <p>Open</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="bg-green-500 text-white font-bold py-2 px-3 border-b-4 border-green-700 rounded" />
                        <p>On Going</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="bg-red-500 text-white font-bold py-2 px-3 border-b-4 border-red-700 rounded" />
                        <p>Close</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="bg-amber-500 text-white font-bold py-2 px-3 border-b-4 border-amber-700 rounded" />
                        <p>Reserved</p>
                    </div>
                    <Select
                        defaultValue="All"
                        style={{
                            width: 120,
                        }}
                        onChange={onChangeCheck}
                        options={[
                            {
                                value: '',
                                label: 'All',
                            },
                            {
                                value: 'open',
                                label: 'Open',
                            },
                            {
                                value: 'ongoing',
                                label: 'On Going',
                            },
                            {
                                value: 'close',
                                label: 'Close',
                            },
                            {
                                value: 'reserved',
                                label: 'Reserved',
                            },
                        ]}
                    />
                </div>
            </div>

            <section className='py-1' />
            
            <div className='w-full h-5/6 p-4 bg-white overflow-y-auto'>
                <div className=' flex items-center flex-wrap gap-x-5'>
                    {tables?.map((item, key) => (
                        <div key={key} className="">
                            {item.status === "open" ? (
                                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-xl py-4 px-6 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                    <p>{item.table_number}</p>
                                </button>
                            ) : null}
                            {item.status === "ongoing" ? (
                                <button className="bg-green-500 hover:bg-green-400 text-white font-bold text-xl py-4 px-6 border-b-4 border-green-700 hover:border-green-500 rounded">
                                    <p>{item.table_number}</p>
                                </button>
                            ) : null}
                            {item.status === "close" ? (
                                <button className="bg-red-500 hover:bg-red-400 text-white font-bold text-xl py-4 px-6 border-b-4 border-red-700 hover:border-red-500 rounded">
                                    <p>{item.table_number}</p>
                                </button>
                            ) : null}
                            {item.status === "reserved" ? (
                                <button className="bg-amber-500 hover:bg-amber-400 text-white font-bold text-xl py-4 px-6 border-b-4 border-amber-700 hover:border-amber-500 rounded">
                                    <p>{item.table_number}</p>
                                </button>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TableIndex;