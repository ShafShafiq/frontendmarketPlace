import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';



const CustomerSignup = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const useremail = event.target.elements.useremail.value;
        const name = event.target.elements.name.value;
        const password = event.target.elements.password.value;
        const phoneNumber = event.target.elements.phoneNumber.value;

        try {
            const response = await axios.post('http://localhost:5000/users/signup', {
                useremail,
                name,
                password,
                accounttype: 'Seller',
                phoneNumber,
            });

            // Save the token to local storage
            localStorage.setItem('token', response.data.token);

            Swal.fire({
                icon: 'success',
                title: 'Signup successful',
                showConfirmButton: false,
                timer: 1500
            });

            // Navigate to the seller home page
            navigate('/seller-home');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.error,
            });
        }
    };


    const heading="Sign Up to account"
    const    paragraph="Already have an Account "
     const    linkName="LogIn"
    const    linkUrl="/sellerlogin"



    // JSX
    return (
        <>

<div className="mb-10">
            <div className="flex justify-center">
          
           
            <img 
                    alt=""
                    className="h-14 w-14 my-4"
                    src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png"/>
          </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
                {linkName}
            </Link>
            </p>
        </div>


        
        <form onSubmit={handleSubmit}className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2 mx-auto'>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="useremail">
                    Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="useremail" type="email" placeholder="Email" required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="useremail">
                    Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" type="text" placeholder="Name" required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="useremail">
                    Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="Password" required />

            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="useremail">
                    Phnoe Number
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="phoneNumber" type="tel" placeholder="Phone Number" required />
            </div>

            <div className=" flex justify-center items-center py-3">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " type="submit">
                    Sign Up
                </button>
            </div>

           
        </form>

        </>
    );
};

export default CustomerSignup;