import React from 'react'
import Widget from './Widget'
import Charts from './Charts'
import Table from './Table'

const AdminHomeContainer = () => {
  return (
    <div className="p-5">
      
      <div className="flex flex-wrap gap-5 justify-between">
        <Widget type={'user'} />
        <Widget type={'order'} />
        <Widget type={'earning'} />
        <Widget type={'balance'} />
      </div>

      <div className="mt-5">
        <Charts />
      </div>

      
      <div className="mt-5">
        <Table />
      </div>
    </div>
  )
}

export default AdminHomeContainer
