import { Anchor, Button, Checkbox, PasswordInput, rem, TextInput } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const SignUp = () => {

  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const iconn = <IconLock style={{ width: rem(16), height: rem(16) }} />;
  
  return (
    <div className="w-4/12 px-20 flex flex-col justify-center gap-3">

      <div className="text-2xl font-semibold ">Create Account</div>

      <div className="flex gap-2 ">
        <TextInput className="w-1/2" withAsterisk label="First Name"   placeholder="First Name" />
        <TextInput  className="w-1/2" withAsterisk label="Last Name"   placeholder="Last Name" />
      </div>
      <TextInput  withAsterisk label="User Name"   placeholder="username" />
      <TextInput withAsterisk  leftSection={icon} label="Email"   placeholder="Your email" />
      <PasswordInput  withAsterisk leftSection={iconn}  label="Password"  placeholder="Password"/>
      <PasswordInput  withAsterisk leftSection={iconn}  label="Confirm password"  placeholder="Confirm password"/>
      <Checkbox autoContrast  label={<>I accept {' '}<Anchor>terms and conditions</Anchor></>}/> 
    
      <Button autoContrast variant="filled">Sign Up</Button>
      <div className="mx-auto">Have an account ?<Link to="/login" className="text-brightSun-400 hover:underline">Login</Link></div>
    </div>
  )
}

export default SignUp
