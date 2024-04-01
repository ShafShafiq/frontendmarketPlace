import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { NavbarDefault } from './navbar.jsx';
import Navbar from './navbar';

function SellerHome() {
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/items/userItems', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (Array.isArray(response.data.items)) {
                setItems(response.data.items);
            } else {
                console.error('Data from server is not an array:', response.data);
                setItems([]);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }, [items]);

    const handleUpdate = (id) => {
        setEditingItem(id);
    };

    const handleSave = (id, event) => {
        event.preventDefault();
        const form = event.target;
        const itemName = form.elements.itemName ? form.elements.itemName.value : '';
        const itemDescription = form.elements.itemDescription ? form.elements.itemDescription.value : '';
        const itemPrice = form.elements.itemPrice ? form.elements.itemPrice.value : '';
        const itemImage = form.elements.itemImage ? form.elements.itemImage.value : ''; 

        axios.put(`http://localhost:5000/items/updateItem/${id}`, 
            {
                itemName,
                itemPrice,
                itemDescription,
                itemImage
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(response => {
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Item updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                });

                // Update the item in the items state
                setItems(items.map(item => item._id === id ? {...item, itemName, itemPrice, itemDescription, itemImage} : item));            }
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'An error occurred',
                // text: error.response.data.error.message,
            });
        });
       
        setEditingItem(null);
        form.reset();
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/items/deleteItem/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setItems(items.filter(item => item._id !== id));
            Swal.fire({
                icon: 'success',
                title: 'Item deleted successfully',
                showConfirmButton: false,
                timer: 1500
            });
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.error,
            });
        });
    };
    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        const maxSize = 0; // 0 bytes

        if (file.size > maxSize) {
            alert('File size should not exceed 0 bytes.');
            event.target.value = null; // Reset the file input field
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const itemName = event.target.elements.itemName.value;
        const itemPrice = event.target.elements.itemPrice.value;
        const itemDescription = event.target.elements.itemDescription.value;
        const itemImage = event.target.elements.itemImage.files[0];

        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('itemPrice', itemPrice);
        formData.append('itemDescription', itemDescription);
        formData.append('itemImage', itemImage);

        try {
            const response = await axios.post('http://localhost:5000/items/addItem', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setItems([...items, response.data]);
            Swal.fire({
                icon: 'success',
                title: 'Item added successfully',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.error,
            });
        }
    };

    return (
        <> <Navbar />
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4  text-center">Add new item </h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
                    <input name="itemName" type="text" placeholder="Item Name" required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <input name="itemPrice" type="number" placeholder="Item Price" required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
                    <input name="itemDescription" type="text" placeholder="Item Description" required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemImage">
                            Item Image
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="itemImage" type="file" required />
                    </div>     
                 </div>
                <div className="flex justify-center items-center">
                    <button type="submit" className="w-1/2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Add Item</button>
                </div>
            </form>
            <h1 className="text-4xl font-bold mb-4  text-center">Your Items</h1>
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {items.map((item) => (
                        <div key={item._id} className="p-2">
                            <div className="p-4 border border-gray-300 rounded shadow-md">
                                <img src={item.itemImage} alt={item.itemName} className="object-cover w-full h-64 rounded" />
                                {editingItem === item._id ? (
                                    <form onSubmit={(event) => handleSave(item._id, event)}>
                                        <input name="itemName" type="text" defaultValue={item.itemName} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                        <input name="itemDescription" type="text" defaultValue={item.itemDescription} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                        <input name="itemPrice" type="number" defaultValue={item.itemPrice} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                        <input 
                                            // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                            name="itemImage" 
                                            type="file" 
                                            required 
                                            onChange={handleImageSelect} 
                                            className="w-full px-3 py-2 border rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        />     
                                        <p className="text-xs text-gray-500 mt-2">Image should be 800x800.</p>                                        
                                         <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Save</button>
                                        <button onClick={() => setEditingItem(false)} className="p-2 bg-green-500 text-white rounded hover:bg-green-700">Cancel</button>                                    </form>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold mb-2">{item.itemName}</h2>
                                        <p className="text-gray-700">{item.itemDescription}</p>
                                        <p className="text-blue-500 font-bold">${item.itemPrice}</p>
                                        <div className="flex space-x-2 mt-4">
                                            <button onClick={() => handleUpdate(item._id)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Edit</button>
                                            <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-700">Delete</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default SellerHome;