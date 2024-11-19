import { Badge, Tabs } from "@mantine/core"
import Gallery from "./Gallery"

const GalleryTabs = () => {
  return (
    <div className="mt-5 w-3/4 px-5">
    <div className="text-2xl font-semibold  flex items-center">Media/Gallery <Badge  ml="sm"  variant="light" size="sm" color="blueRibbon.6">Active</Badge></div>
    <div className="font-medium text-mine-shaft-800 mb-5">RC TENNIS ACADEMY</div>
    <div>
            <Tabs variant='outline' radius="lg" defaultValue="overview">
                        <Tabs.List className="[&_button]:!text-lg text-blueRibbon-700 font-semibold mb-5 [&_button[data-active='true']]:text-blueRibbon-950">
                            <Tabs.Tab value="overview">All</Tabs.Tab>
                            <Tabs.Tab value="applicants">Coaches</Tabs.Tab>
                            <Tabs.Tab value="invited">Students</Tabs.Tab>
                            <Tabs.Tab value="achievement">Achievements</Tabs.Tab>
                        </Tabs.List>

                  {/* Here all conditon will be applied               */}
            </Tabs>
            <Gallery/>
      </div>
      
    </div>
  )
}

export default GalleryTabs
