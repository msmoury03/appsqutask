import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboardpage = () => {

  const userinfo = JSON.parse(localStorage.getItem('userinfo'))


  const navigate = useNavigate()

  const handlelogout = ()=>{
    window.location.reload()
    localStorage.removeItem('token')
    navigate('/login')

  }
  return (
    <div>
      
      Welcome to dashboard

      <div>
      Hi {userinfo?.firstName} {userinfo?.lastName}
      </div>

      

      <div>
        <button className='bg-blue-500 p-2 rounded-md text-white' onClick={handlelogout}>Logout</button>
      </div>
    </div>
  )
}

export default Dashboardpage