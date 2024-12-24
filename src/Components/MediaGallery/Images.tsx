// import nadal from "../../src/assets/images/nadal.png"
// import image1 from  "../../src/assets/images/tenisplayer1.png"
// import image2 from  "../../src/assets/images/lawn tenis1.png"
// import image3 from  "../../src/assets/images/tenisplayer3.png"
// import image4 from  "../../src/assets/images/tenis2.jpeg"

interface ImageProps {
      src: string;
    
     
    }
    


  const Images = ({ src }: ImageProps) => { 
    console.log(src)
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
    <div className="relative w-full h-48 sm:h-52 md:h-60 lg:h-64">
    <img
      className="w-full h-full object-cover rounded-md"
      src={src}
      alt={src}
      loading="lazy" 
    />
    </div>
  )
}

export default Images
