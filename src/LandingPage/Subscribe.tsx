import { TextInput, Button } from "@mantine/core";

const Subscribe = () => {
  return (
    <div className='mt-20 flex items-center bg-blueRibbon-900 mx-20 py-3 rounded-xl justify-around'>
        <div className="text-4xl w-2/5 text-center font-semibold text-mine-shaft-100 ">
            Never Miss <span className="text-blueRibbon-600">Tennis Updates!</span>
        </div>

        <div className="flex gap-4 bg-blueRibbon-700 px-3 py-2 items-center rounded-xl ">
            <TextInput 
                className="[&_input]:text-mine-shaft-100 font-semibold"
                placeholder="YourEmail@example.com"
                variant="unstyled"
                size="xl"
            />
            <Button className="rounded-lg" size="lg" color="blueRibbon">Subscribe</Button>
        </div>
    </div>
  );
}

export default Subscribe;
