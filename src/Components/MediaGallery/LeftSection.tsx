import React from 'react'
import LottieAnimation from '../Common/LottieAnimation'

const LeftSection = () => {
  return (
    <div className='w-1/6 mt-5'>
      <div className='text-2xl font-semibold mb-5'>Left Section</div>
      {/* <div>
        <h2>Image Reference</h2>
      </div> */}
      <div className='h-48 w-48'>
        <LottieAnimation/>
      </div>

    </div>
  )
}

export default LeftSection
