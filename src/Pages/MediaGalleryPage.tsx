import { Divider } from "@mantine/core"
import GalleryTabs from "../MediaGallery/GalleryTabs"
import LeftSection from "../MediaGallery/LeftSection"

const MediaGalleryPage = () => {
  return (
    <div className="min-h-[90vh] bg-white  px-4">
      <Divider size="xs"/>
        <div className="flex gap-5 ">
           <LeftSection/>
           <GalleryTabs/>
        </div>
    </div>
  )
}

export default MediaGalleryPage
