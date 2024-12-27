import React from 'react'
import AdminSidebar from './AdminSidebar';
import AdminHomeContainer from './AdminHomeContainer';

const AdminHome = () => {
  return (
    <div className='mt-20 flex'>
        {/* SIDE BAR */}
        <div>
            <AdminSidebar/>
        </div>
        {/* Right */}
        <div>
            <AdminHomeContainer/>
        </div>

    </div>
  )
}

export default AdminHome;