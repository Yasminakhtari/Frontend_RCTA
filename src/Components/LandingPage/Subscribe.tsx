import { TextInput, Button } from "@mantine/core";

const Subscribe = () => {
  return (
    <div className='mt-20 flex flex-col md:flex-row items-center bg-blueRibbon-900 mx-4 py-3 rounded-xl justify-center lg:justify-around gap-2 px-4'>
        <div className="md:text-2xl lg:text-4xl w-full lg:w-2/5 text-center font-semibold text-mine-shaft-100 ">
            Never Miss <span className="text-blueRibbon-600">Tennis Updates!</span>
        </div>

        <div className="flex gap-4 bg-blueRibbon-700 px-3 py-2 items-center rounded-xl w-full lg:w-3/5 ">
            <TextInput 
                className="[&_input]:text-mine-shaft-100 font-semibold lg:text-lg text-sm"
                placeholder="YourEmail@example.com"
                variant="unstyled"
                // size="xl"
            />
            <Button className="rounded-lg lg:text-lg text-sm" color="blueRibbon">Subscribe</Button>
        </div>
    </div>
  );
}

export default Subscribe;
