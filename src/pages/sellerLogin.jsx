import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const SellerLogin = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const useremail = event.target.elements.useremail.value;
        const password = event.target.elements.password.value;

        try {
            const response = await axios.post('http://localhost:5000/users/login', {
                useremail,
                password,
            });

            // Save the token to local storage
            localStorage.setItem('token', response.data.token);


            Swal.fire({
                icon: 'success',
                title: 'Login successful',
                showConfirmButton: false,
                timer: 1500
            });
            console.log(response.data)
            if(response.data.accounttype ==='Seller'){
                navigate('/seller-home');
            }
            else{
                //add the home page
            }
            // Navigate to the seller home page
            // 
        } catch (error) {
    const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error.message
        : 'An error occurred';

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
    });
}
    };

   const heading="Login to your account"
            const    paragraph="Don't have an account yet? "
             const    linkName="Signup"
            const    linkUrl="/CustomerSignup"
    // JSX
    return (

        <>
            <div className="mb-10">
                <div className="flex justify-center py-2">
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

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-1/2 mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="useremail">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="useremail" type="email" placeholder="Email" required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="Password" required />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div className="flex justify-center items-center py-3">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Log In
                    </button>
                </div>
            </form>
        </>
    );
};

export default SellerLogin;