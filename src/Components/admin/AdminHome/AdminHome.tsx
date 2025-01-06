import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHomeContainer from './AdminHomeContainer'
import Draggable from 'react-draggable';

const AdminHome = () => {
  return (
    <div className='mt-20 flex'>
      {/* SIDE BAR */}
      <div className="sticky top-0 h-screen bg-gray-800 p-5 w-64">
        <AdminSidebar />
      </div>

      {/* Right side content that is movable */}
      <div className="flex-grow p-5">
        {/* <Draggable> */}
          <div className="bg-white shadow-md rounded-lg p-5">
            <AdminHomeContainer />
          </div>
        {/* </Draggable> */}
      </div>
    </div>
  )
}

export default AdminHome;
