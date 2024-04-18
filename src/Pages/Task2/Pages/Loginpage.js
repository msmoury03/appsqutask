import { Spinner } from '@material-tailwind/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const Loginpage = () => {

    const navigate = useNavigate()
    const [data, setdata] = useState({
        mobile: '',
        password: ''
    })


    const [loading, setloading] = useState(false)

    // handleChange basicly for any change in any value function call

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setdata({ ...data, [name]: value })

    }




    // this function call for login button clicked 

    // const handlelogin = async () => {
    //     if (data.email !== '') {
    //         if (data.password !== '') {
    //             setloading(true)
    //             await axios.post('https://dummyjson.com/auth/login', { username: data.email, password: data.password }).then((res) => {
    //                 toast.success('Login Successfull')
    //                 localStorage.setItem('token', res.data?.token)
    //                 localStorage.setItem('userinfo', JSON.stringify(res.data))
    //                 navigate('/dashboard')
    //                 window.location.reload()







    //             }).catch((e) => {
    //                 toast.error(e?.response?.data?.message)
    //             })
    //             setloading(false)


    //         } else {
    //             toast.warn('please enter password')
    //         }
    //     } else {
    //         toast.warn('Please enter a valid username')
    //     }
    // }


    const handlelogin = async () => {
        if (data.mobile !== '') {
            if (data.password !== '') {
                setloading(true)
                await axios.post('https://developmentapi.videocrypt.in/data_model/users/login_auth',  `device_id=0&mobile=${data?.mobile}&is_social=0&c_code=91&password=${data?.password}` ,{headers:{"Version":1998,"Lang":1,"Devicetype":4}}).then((res) => {
                    // toast.success('Login Successfull')
                    // localStorage.setItem('token', res.data?.token)
                    // localStorage.setItem('userinfo', JSON.stringify(res.data))
                    // navigate('/dashboard')
                    // window.location.reload()

                    if(res.data?.status){
                        toast.success(res.data?.message)
                        localStorage.setItem('jwt', res.data?.data?.jwt)

                                // localStorage.setItem('userinfo', JSON.stringify(res.data))
                                navigate('/dashboard')
                                window.location.reload()

                    }else{
                    toast.error(res.data?.message)

                    }







                }).catch((e) => {
                    toast.error(e?.response?.data?.message)
                })
                setloading(false)


            } else {
                toast.warn('please enter password')
            }
        } else {
            toast.warn('Please enter a valid Mobile Number')
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
                                Sign in to your account
                            </h1>
                            <div class="space-y-4 md:space-y-6">
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Mobile</label>
                                    <input type="text" onChange={handleChange} name="mobile" id="mobile" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="mobile" required="" />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" onChange={handleChange} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>

                                <button onClick={handlelogin} class="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> {loading ? <Spinner /> : 'Sign in'}  </button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link to={'/signup'} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Loginpage