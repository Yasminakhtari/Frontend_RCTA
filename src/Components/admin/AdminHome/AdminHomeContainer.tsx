import React from 'react'
import Widget from './Widget'
import Charts from './Charts'
import Table from './Table'

const AdminHomeContainer = () => {
  return (
    <>
      <div>
        <div className='flex p-5 gap-5'>
          <Widget type={'user'} />
          <Widget type={'order'} />
          <Widget type={'earning'} />
          <Widget type={'balance'} />
        </div>
        <Charts/>
        <Table/>
      </div>
    </>
  )
}

export default AdminHomeContainer