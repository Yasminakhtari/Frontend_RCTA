import { Button, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Login = () => {
  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const iconn = <IconLock style={{ width: rem(16), height: rem(16) }} />;
  
  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">

      <div className="text-2xl font-semibold ">Create Account</div>

      <TextInput withAsterisk  leftSection={icon} label="Email"   placeholder="Your email" />
      <PasswordInput  withAsterisk leftSection={iconn}  label="Password"  placeholder="Password"/> 
    
      <Button autoContrast variant="filled">Signin</Button>
      <div className="mx-auto">Don't have an account ?<Link to="/signup" className="text-bg-blueRibbon-600 hover:underline">SignUp</Link></div>
    </div>
  )
}

export default Login
