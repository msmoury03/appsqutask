

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const Signuppage = () => {

    const [data, setdata] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    })


    // handleChange basicly for any change in any value function call

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setdata({ ...data, [name]: value })

    }


    // this function validate email is email is valid or not 

    const validateEmail = (inputValue) => {
        let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if (!emailRegex.test(inputValue)) {
            return false
        } else {
            return true
        }
    }


    function checkPassword(password) {
        // Check if the password is at least 8 characters long.
        if (password.length < 8) {
            return false;
        }

        // Check if the password contains at least one uppercase letter.
        if (!/[A-Z]/.test(password)) {
            return false;
        }

        // Check if the password contains at least one lowercase letter.
        if (!/[a-z]/.test(password)) {
            return false;
        }

        // Check if the password contains at least one number.
        if (!/[0-9]/.test(password)) {
            return false;
        }

        // Check if the password contains at least one special character.
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            return false;
        }

        // the password is strong.
        return true;
    }



    // this function basicly call for checking password and confirm password 

    const validatepassandcpass = (pass, cpass) => {
        if (pass == cpass) {
            return true
        } else {
            return false
        }

    }


    // this function basicly call when user click on create account button

    const handlecreateaccount = () => {
        if (data.name !== '') {
            if (validateEmail(data.email)) {
                if (checkPassword(data.password)) {
                    if (validatepassandcpass(data.password, data.cpassword)) {
                        console.log('hhh')

                    } else {
                        toast.warn('Confirm password mismatch')
                    }
                } else {
                    toast.warn('Please use strong Password')
                }
            } else {
                toast.warn('Please enter a valid email id')
            }
        } else {
            toast.warn('Please enter Name')
        }
    }


    return (
        <div>

            <ToastContainer />
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create a Account
                            </h1>
                            <div class="space-y-4 md:space-y-6" >
                                <div>
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input onChange={handleChange} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name" required="" />
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" onChange={handleChange} name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" onChange={handleChange} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>

                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input type="password" onChange={handleChange} name="cpassword" id="cpassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>

                                <button onClick={handlecreateaccount} class="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create account</button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    already have a an account? <Link to={'/login'} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign-in</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signuppage