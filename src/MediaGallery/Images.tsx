import nadal from "../../src/assets/images/nadal.png"
import image1 from  "../../src/assets/images/tenisplayer1.png"
import image2 from  "../../src/assets/images/lawn tenis1.png"
import image3 from  "../../src/assets/images/tenisplayer3.png"
import image4 from  "../../src/assets/images/tenis2.jpeg"

interface ImageProps {
      src: string;
      alt: string;
      colSpan: number;
      rowSpan: number;
    }
    

const Images = ({ src, alt, colSpan, rowSpan }: ImageProps) => {
      
  return (
//     <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20'>
        
//       <div className="col-span-3 row-span-12 text-white">
//             <img className="w-full h-full object-cover object-top rounded-md" src={nadal} alt=""/>
//       </div>

//       <div className="col-span-2 row-span-6 text-white">
//             <img className="w-full h-full object-cover object-top rounded-md" src={nadal} alt=""/>
//       </div> 

//       <div className="col-span-4 row-span-6 text-white">
//             <img className="w-full h-full object-cover object-top rounded-md" src={image3}  alt=""/>
//       </div> 
    
//       <div className="col-span-3 row-span-12 text-white">
//             <img className="w-full h-full object-cover object-top rounded-md"  src={image2}  alt=""/>
//       </div>
    
//       <div className="col-span-4 row-span-6 text-white">
//             <img  className="w-full h-full object-cover object-top rounded-md" src={image4}  alt=""/>
//       </div>
//       <div className="col-span-2 row-span-6 text-white">
//             <img className="w-full h-full object-cover object-top rounded-md"  src={image1}  alt=""/>
//       </div>
 
  
//     </div>
            <div
            className={`col-span-${colSpan} row-span-${rowSpan} text-white  justify-center`}
            // style={{ maxWidth: "200px", maxHeight: "300px" }} 
            >
            <img
            className="w-full h-full object-cover object-top rounded-md"
            src={src}
            alt={alt}
            style={{ borderRadius: "8px" }} 
            />
            </div>
  )
}

export default Images
