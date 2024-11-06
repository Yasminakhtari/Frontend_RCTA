import { Avatar,Rating } from "@mantine/core";
import {testimonials} from "../Data/Data";

const Testimonials = () => {
  return (
    <div className=" mt-20 pb-5">

            <div className="text-4xl text-center font-semibold text-mine-shaft-100 mb-3">
                What <span className="text-cyanAqua-400">User</span> Says about us?
            </div>

            {/* Card Section */}
            <div className="flex gap-3 justify-evenly">
                {
                    testimonials.map((items,index)=>(
                        <div key={index} className="flex flex-col gap-3 w-[23%] border-cyanAqua-400 p-3 border rounded-xl mt-10">
                            <div className="flex gap-2 items-center ">
                                <div>
                                    <Avatar className="!h-14 !w-14 " src="iranian-8594205_1280.jpg" alt={items.name} />
                                    <div>
                                        <div className="text-lg text-mine-shaft-100 font-semibold">{items.name}</div>
                                        <Rating value={items.rating} fractions={2} color="cyanAqua" readOnly />
                                    </div>
                                </div>
                                <div className="text-xs text-mine-shaft-300 ">
                                {items.testimonial}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
    </div>
  )
}

export default Testimonials