import React from "react";
import dessert from '../asset/dessert.jpg';
import rendang from '../asset/rendang.jpg';
import appetizer from '../asset/appetizer.jpg';
import beverage from '../asset/beverage.jpg';

function FoodCategory({category, setCategory}) {

    return (
        <React.Fragment>
            <div className="mt-4 mx-8 grid grid-cols-4 grid-flow-row items-center gap-1">
                <p className="font-bold text-2xl col-span-4 mb-3"> Categories </p>
                <div className={`col-span-1 py-2 ${category === 'dessert' ? 'bg-amber-200 rounded' : '' }`} onClick={() => {if (category === 'dessert') { setCategory(''); return; } setCategory('dessert');}}>
                    <img alt="a" src={dessert} className="mx-auto rounded-xl h-16 w-16 object-cover shadow-lg" />
                    <p className="mt-1 text-center text-sm font-semibold">Dessert</p>
                </div>
                <div className={`col-span-1 py-2 ${category === 'main dishes' ? 'bg-amber-200 rounded' : '' }`} onClick={() => { if (category === 'main dishes') { setCategory(''); return; } setCategory('main dishes')}}> 
                    <img alt="a" src={rendang} className="mx-auto rounded-xl h-16 w-16 object-cover shadow-lg" />
                    <p className="mt-1 text-center text-sm font-semibold">Main Dish</p>
                </div>
                <div className={`col-span-1 py-2 ${category === 'appetizer' ? 'bg-amber-200 rounded' : '' }`} onClick={() => { if (category === 'appetizer') { setCategory(''); return; } setCategory('appetizer')}}> 
                    <img alt="a" src={appetizer} className="mx-auto rounded-xl h-16 w-16 object-cover shadow-lg" />
                    <p className="mt-1 text-center text-sm font-semibold">appetizer</p>
                </div>
                <div className={`col-span-1 py-2 ${category === 'beverage' ? 'bg-amber-200 rounded' : '' }`} onClick={() => {if (category === 'beverage') { setCategory(''); return; } setCategory('beverage')}}> 
                    <img alt="a" src={beverage} className="mx-auto rounded-xl h-16 w-16 object-cover shadow-lg" />
                    <p className="mt-1 text-center text-sm font-semibold">beverage</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default FoodCategory;