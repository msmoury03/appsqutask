import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const Dashboardpage = () => {

  const token = localStorage.getItem('token')


  const navigate = useNavigate()

  const handlelogout = async()=>{
    // window.location.reload()
    // localStorage.removeItem('token')
    // navigate('/login')

    

    await axios.post('https://developmentapi.videocrypt.in/data_model/users/logout',  `` ,{headers:{"Version":1998,"Lang":1,"Devicetype":4,"Jwt":token,"Userid":15377}}).then((res) => {
      // toast.success('Login Successfull')
      // localStorage.setItem('token', res.data?.token)
      // localStorage.setItem('userinfo', JSON.stringify(res.data))
      // navigate('/dashboard')
      // window.location.reload()
      console.log(res.data)

      localStorage.removeItem('jwt')
      navigate('/login')
    window.location.reload()
      if(res.data?.status){
        toast.success(res.data?.message)
                  // localStorage.setItem('userinfo', JSON.stringify(res.data))
                  

      }else{
      toast.error(res.data?.message)

      }







  }).catch((e) => {
      toast.error(e?.response?.data?.message)
  })

  }
  return (
    <div>

      <ToastContainer/>
      
      Welcome to dashboard

      <div>
      Hi 
      </div>

      

      <div>
        <button className='bg-blue-500 p-2 rounded-md text-white' onClick={handlelogout}>Logout</button>
      </div>
    </div>
  )
}

export default Dashboardpage