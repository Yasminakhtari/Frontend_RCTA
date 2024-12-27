import React from 'react'
import Featured from './Featured'
import Chart from './Chart'

const Charts = () => {
  return (
    <div className='flex gap-6'>
        <Featured/>
        <Chart/>
    </div>
  )
}

export default Charts