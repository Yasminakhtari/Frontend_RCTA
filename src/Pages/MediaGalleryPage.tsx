// import { Divider } from "@mantine/core"
// import GalleryTabs from "../Components/MediaGallery/GalleryTabs"
// import LeftSection from "../Components/MediaGallery/LeftSection"

// const MediaGalleryPage = () => {
//   return (
//     <div className="min-h-[90vh] bg-white  px-4">
//       <Divider size="xs"/>
//         <div className="flex gap-5 ">
//            <LeftSection/>
//            <GalleryTabs/>
//         </div>
//     </div>
//   )
// }

// export default MediaGalleryPage
import { Divider } from "@mantine/core";
import GalleryTabs from "../Components/MediaGallery/GalleryTabs";
import LeftSection from "../Components/MediaGallery/LeftSection";

const MediaGalleryPage = () => {
  return (
    <div className="min-h-[90vh] bg-white px-4">
      <Divider size="xs" />

      {/* Responsive Wrapper */}
      <div className="flex flex-col lg:flex-row gap-5">

        {/* Left Section */}
        <div className="hidden lg:block lg:w-1/5">
          <LeftSection />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/5">
          <GalleryTabs />
        </div>

      </div>
    </div>
  );
};

export default MediaGalleryPage;

