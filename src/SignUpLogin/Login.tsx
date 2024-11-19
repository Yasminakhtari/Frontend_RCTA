import { Button, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Login = () => {
  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const iconn = <IconLock style={{ width: rem(16), height: rem(16) }} />;
  
  return (
    <div className="w-1/2 px-20 flex flex-col justify-center items-center gap-3 ">

      <div className=" border-white border-[2px] w-2/3  shadow-xl rounded-2xl bg-white/20 p-6">
          <div className="text-2xl font-semibold   flex items-center justify-center text-white bg-blue-700/70 p-4">SignIn Account</div>

          <TextInput withAsterisk  leftSection={icon} label="Email"   placeholder="Your email" />
          <PasswordInput  withAsterisk leftSection={iconn}  label="Password"  placeholder="Password"/> 

          <div className="mt-4 bg-blueRibbon-600">
            <Button autoContrast fullWidth variant="filled" color="rgba(30 80 207)">Signin</Button>
          </div>
          <div className="mx-auto mt-2">Don't have an account ?<Link to="/signup" className="text-blueRibbon-900 hover:underline">SignUp</Link></div>
      </div>
    </div>
  )
}

export default Login
