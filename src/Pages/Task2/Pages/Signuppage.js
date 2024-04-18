

import { Spinner } from '@material-tailwind/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const Signuppage = () => {

    const navigate = useNavigate()

    const [data, setdata] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
        mobile: '',
        country: '',
        state: '',
        city: '',
        otp: ''
    })

    const [loading, setloading] = useState(false)

    const [otpsent, setotpsent] = useState(false)


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




    const handlesendotp = async () => {
        if (data.name !== '') {
            if (data.mobile !== '') {
                if (validateEmail(data.email)) {
                    if (checkPassword(data.password)) {
                        if (validatepassandcpass(data.password, data.cpassword)) {
                            setloading(true)
                            await axios.post('https://developmentapi.videocrypt.in/data_model/users/send_verification_otp', `mobile=${data?.mobile}&resend=0&is_registration=1&c_code=+91`, { headers: { "Version": 1998, "Lang": 1, "Devicetype": 4 } }).then((res) => {
                                // toast.success('Login Successfull')
                                // localStorage.setItem('token', res.data?.token)
                                // localStorage.setItem('userinfo', JSON.stringify(res.data))
                                // navigate('/dashboard')
                                // window.location.reload()

                                if (res.data?.status) {
                                    setotpsent(true)
                                    toast.success(res.data?.message)

                                } else {
                                    toast.error(res.data?.message)

                                }







                            }).catch((e) => {
                                toast.error(e?.response?.data?.message)
                            })
                            setloading(false)

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
                toast.warn('Please enter Mobile Number')
            }

        } else {
            toast.warn('Please enter Name')
        }
    }


    // this function basicly call when user click on create account button

    const handlecreateaccount = async () => {
        if (data.name !== '') {
            if (data.mobile !== '') {
                if (validateEmail(data.email)) {
                    if (checkPassword(data.password)) {
                        if (data?.otp?.length==6) {
                            setloading(true)

                            await axios.post('https://developmentapi.videocrypt.in/data_model/users/send_verification_otp', `mobile=${data?.mobile}&resend=0&otp=${data?.otp}&is_registration=1&c_code=+91`, { headers: { "Version": 1998, "Lang": 1, "Devicetype": 4 } }).then(async(res)  => {
                                // toast.success('Login Successfull')
                                // localStorage.setItem('token', res.data?.token)
                                // localStorage.setItem('userinfo', JSON.stringify(res.data))
                                // navigate('/dashboard')
                                // window.location.reload()

                                if (res.data?.status) {

                                    await axios.post('https://developmentapi.videocrypt.in/data_model/users/registration', `name=${data?.name}&email=${data?.email}&mobile=${data?.mobile}&country=${data?.country}&state=${data?.state}&city=${data?.city}&device_id=0&is_social=0&password=${data?.password}&device_token=0&otp=${data?.otp}`, { headers: { "Version": 1998, "Lang": 1, "Devicetype": 4 } }).then((res) => {
                                // toast.success('Login Successfull')
                                

                                if (res.data?.status) {
                                    toast.success(res.data?.message)
                                    localStorage.setItem('jwt', res.data?.data?.jwt)
                                // localStorage.setItem('userinfo', JSON.stringify(res.data))
                                navigate('/dashboard')
                                window.location.reload()
                                    
                                } else {
                                    
                                    toast.error(res.data?.message)

                                }







                            }).catch((e) => {
                                toast.error(e?.response?.data?.message)
                            })
                                    

                                } else {
                                    toast.error(res.data?.message)

                                }







                            }).catch((e) => {
                                toast.error(e?.response?.data?.message)
                            })


                            
                            setloading(false)

                        } else {
                            toast.warn('Please use 6 Digit OTP')
                        }
                    } else {
                        toast.warn('Please use strong Password')
                    }
                } else {
                    toast.warn('Please enter a valid email id')
                }
            } else {
                toast.warn('Please enter Mobile Number')
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

                                {
                                    otpsent ? <div>
                                        <label for="otp" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">OTP</label>
                                        <input type="text" onChange={handleChange} name="otp" id="otp" placeholder="OTP" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div> :


                                        <div class="space-y-4 md:space-y-6">

                                            <div>
                                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                                <input onChange={handleChange} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name" required="" />
                                            </div>

                                            <div>
                                                <label for="mobile" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Mobile</label>
                                                <input type="text" onChange={handleChange} name="mobile" id="mobile" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="9897867676" required="" />
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

                                            <div class="">
                                                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select  Country</label>
                                                <select value={data?.country} onChange={handleChange} name='country' id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option selected>Choose a country</option>
                                                    <option value="India">India</option>
                                                    <option value="Canada">Canada</option>
                                                    <option value="France">France</option>
                                                </select>
                                            </div>


                                            <div class="">
                                                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select  State</label>
                                                <select value={data?.state} onChange={handleChange} name='state' id="state" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option selected>Choose a state</option>
                                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                    <option value="Bihar">Bihar</option>
                                                    <option value="Delhi">Delhi</option>
                                                    <option value="Gujarat">Gujarat</option>
                                                </select>
                                            </div>

                                            <div class="">
                                                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select  City</label>
                                                <select value={data?.city} onChange={handleChange} name='city' id="city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option selected>Choose a City</option>
                                                    <option value="Ahmedabad">Ahmedabad</option>
                                                    <option value="Gwalior">Gwalior</option>
                                                    <option value="Bhopal">Bhopal</option>
                                                    <option value="Gurgaon">Gurgaon</option>
                                                </select>
                                            </div>

                                        </div>

                                }







                                {
                                    otpsent ? <button onClick={handlecreateaccount} class="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> {loading ? <Spinner /> : 'Create account'} </button> : <button onClick={handlesendotp} class="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{loading ? <Spinner /> : 'Create account OTP'} </button>
                                }






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