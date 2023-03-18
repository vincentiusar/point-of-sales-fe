import React from "react";

function SearchBar(props) {
    
    return (
        <>
            <div className={`p-4 pb-16 ${props.images ? 'text-white' : 'text-black'} bg-orange-100 h-auto`} style={props.images ? {background: `linear-gradient(rgb(0 0 0 / 0.5), rgb(0 0 0 / 0)), url(${props.images})`, backgroundSize: '30rem'} : null}>
                <p className="mt-5 mx-3 font-bold text-4xl break-words line-clamp-2">{props.name}</p>
                <p className="mt-4 mx-3 font-semibold">Mau Makan Apa Hari Ini?</p>
            </div>
            <div className="sticky top-0 p-3 -mt-12 text-center z-10">
                <input type="text" onChange={props.handleSearch} placeholder="Cari Makanan..." className="p-5 rounded-lg h-14 w-11/12 shadow-lg" />
            </div>
        </>
    );
}

export default SearchBar;