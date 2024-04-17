import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fethbasic } from '../Redux/Actions/basicdata'
import { ToastContainer, toast } from 'react-toastify'
import { Spinner } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

const Weatherapp = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [search, setsearch] = useState('')

    const [loading, setloading] = useState(false)


    // callforReducer function define for when user click on search button 

    const callforReducer = async () => {
        if (search == '') {
            toast.warning('Please Enter City or Pin code')

        } else {

            setloading(true)
            await dispatch(fethbasic(search))


            setloading(false)
        }
    }

    // getting data from redux store 

    const weatherdataredux = useSelector((state) => state.basicReducer)[0]



    // callforgetdate basicly getting formated date 

    const callforgetdate = () => {
        const date = new Date();
        let datee = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][new Date().getDay()]
        let currentDate = `${day} ${datee}-${month}-${year}`;
        return currentDate
    }


    // getting KM from numbers 

    function kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'km' : Math.sign(num) * Math.abs(num)
    }


    const navigatetoLogin = ()=>{
        navigate('/login')
    }









    return (
        <div>

            <ToastContainer />

            {/* this is search bar  */}

            <div class="pt-2 relative mx-auto text-gray-600">
                <input value={search} onChange={(e) => setsearch(e.target.value)} class="border-2 border-gray-300 bg-white h-10 px-5 pr-1 rounded-lg text-sm focus:outline-none"
                    type="search" name="search" placeholder="Search by City or Pin Code" />
                <button onClick={callforReducer} title='SEARCH' type="submit" class="ml-2 bg-blue-400 p-2 rounded-md text-white font-semibold">
                    <p>SEARCH</p>
                </button>

              
            <button onClick={navigatetoLogin} title='Login' type="submit" class="ml-20 bg-blue-400 p-2 rounded-md text-white font-semibold">
                    <p>LOGIN</p>
                </button>
            </div>

           

            {/* this is design for weather app  */}

            {
                loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}><Spinner /></div> : weatherdataredux == undefined ? <p>Please Search City</p> : <div class="min-h-screen flex items-center justify-center">
                    <div class="flex flex-col bg-white rounded p-4 w-full max-w-xs">
                        <div class="font-bold text-xl">{weatherdataredux?.name}</div>
                        <div class="text-sm text-gray-500">{callforgetdate()}</div>
                        <div class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                            <svg class="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
                        </div>
                        <div class="flex flex-col items-center justify-center mt-6">
                            <div class="font-medium text-2xl">temperature - {weatherdataredux?.main?.temp}</div>
                            <div class="font-medium text-2xl">feels_like - {weatherdataredux?.main?.feels_like}</div>
                            <div class="font-medium text-2xl">pressure - {weatherdataredux?.main?.pressure}</div>

                        </div>
                        <div class="flex flex-row justify-between mt-6">
                            <div class="flex flex-col items-center">
                                <div class="font-medium text-sm">Wind</div>
                                <div class="text-sm text-gray-500">{weatherdataredux?.wind?.speed}k/h</div>
                            </div>
                            <div class="flex flex-col items-center">
                                <div class="font-medium text-sm">Humidity</div>
                                <div class="text-sm text-gray-500">{weatherdataredux?.main?.humidity}%</div>
                            </div>
                            <div class="flex flex-col items-center">
                                <div class="font-medium text-sm">Visibility</div>
                                <div class="text-sm text-gray-500">{kFormatter(weatherdataredux?.visibility)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            }



        </div>
    )
}

export default Weatherapp