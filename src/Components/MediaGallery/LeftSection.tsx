import banner from "../../assets/EBanner.png"
import gift from "../../assets/gift.png"
const LeftSection = () => {
  return (
    <div className='w-full mt-5 '>
      {/* <div className='text-2xl font-semibold mb-5'>Left Section</div> */}
      <div className="flex items-center ">
        <img className="w-10 h-10 mr-3" src={gift} alt="" />
        <span className="font-semibold text-base ">
          <b>John </b>and<b> 3 other friends </b> have a birthday today
        </span>
      </div>

      {
        [1,1,1,1,1,1,1].map(()=>
          (<img className=" border m-1 rounded-md mt-2" src={banner} alt="" />)
          )
      }

    </div>
  )
}

export default LeftSection
