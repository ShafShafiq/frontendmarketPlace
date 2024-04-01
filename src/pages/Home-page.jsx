import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';

function ItemsPage() {
    const [items, setItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [ownerNumber, setOwnerNumber] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/items/items', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setItems(response.data.items);
        })
        .catch(error => {
            console.error('Error fetching items', error);
        });
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/items/searchItems?search=${searchTerm}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setItems(response.data.items);
        })
        .catch(error => {
            console.error('Error fetching items', error);
        });
    }, [searchTerm]);


    const fetchOwnerNumber = (itemId,itemOwner) => {
        setSelectedItemId(itemId);
        axios.get(`http://localhost:5000/users/number/${itemOwner}`)
            .then(response => {
                setOwnerNumber(response.data.number);
            })
            .catch(error => {
                console.error('Error fetching owner number', error);
            });
    };

    const searchItems = () => {
        setSearchTerm(searchTerm);
    };

    return (
        <div className="container mx-auto px-4">
            <Navbar />

            <div className="flex justify-center items-center">
                <label htmlFor="search" className="mr-2">Search items:</label>
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                    placeholder="Search items..." 
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full sm:w-96 md:w-64 lg:w-100 xl:w-100"
                />
            </div>         {/* <button onClick={searchItems}>Search</button> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map(item => (
                    <div key={item.id} className="border rounded-lg overflow-hidden shadow-lg m-2">
                        <img src={item.itemImage} alt={item.itemName} className="object-cover w-full h-64" />
                        <div className="p-4">
                            <h2 className="text-2xl font-bold mb-2 text-center"><strong>{item.itemName}</strong></h2>
                            <p className="text-gray-700 mb-2"><strong>Description: </strong>{item.itemDescription}</p>
                            <p className="text-gray-700 mb-2"><strong>Price: </strong>{item.itemPrice} <strong>$</strong></p>
                            <button onClick={() => fetchOwnerNumber(item._id ,item.itemOwner)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Owner Number</button>
                            {selectedItemId === item._id && ownerNumber && <p className="mt-2"><strong>Owner's Number: </strong> {ownerNumber}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItemsPage;