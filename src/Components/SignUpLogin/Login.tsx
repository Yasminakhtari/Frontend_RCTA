import { Button, LoadingOverlay, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconCheck, IconLock, IconUser, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/UserService";
import { LoginValidation } from "../../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import ResetPassword from "./ResetPassword";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slices/UserSlice";


const Login = (props: any) => {

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const form = {
    username: "",
    password: "",
  }

  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);
  ////
  const handleChange = (event: any) => {

    setFormError({ ...formError, [event.target.name]: "" });
    let name = event.target.name;
    let value = event.target.value;
    setData({ ...data, [name]: value });
  }
  ///
  const handleSubmit = async () => {
    setLoading(true);
    let valid = true, newFormError: { [key: string]: string } = {};
    for (let key in data) {
      newFormError[key] = LoginValidation(key, data[key]);
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    //now here i am passing data inside loginUser
    if (valid === true) {

      loginUser(data).then((res) => {
        console.log(res);
        console.log(res?.data?.token);
        localStorage.setItem("token", JSON.stringify(res?.data?.token))
        localStorage.setItem("loginData",JSON.stringify(res?.data))
        notifications.show({
          title: 'Login Sucessful',
          message: 'Redirecting to home Page...',
          withCloseButton: true,
          icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
          color: "teal",
          withBorder: true,
          className: "!border-green-500"
        })
        setTimeout(() => {
          setLoading(false);
          dispatch(setUser(res));
          // dispatch(setUser(res.userDetails));
          navigate("/*")
        }, 4000)
      }).catch((err) => {
        setLoading(false);
        console.log(err);
        notifications.show({
          title: 'Login Failed',
          message: err.response.data.errorMessage,
          withCloseButton: true,
          icon: <IconX style={{ width: "90%", height: "90%" }} />,
          color: "red",
          withBorder: true,
          className: "!border-red-500"
        })
      }
      );
    }

  }

  const icon = <IconUser style={{ width: rem(16), height: rem(16) }} />;
  const iconn = <IconLock style={{ width: rem(16), height: rem(16) }} />;

  return (


    <>
      <LoadingOverlay
        visible={loading}
        className="translate-x-[93%] md:translate-x-1/2"
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'blueRibbon.9', type: 'bars' }}
      />
      <div className=" w-[95%] md:w-1/2  md:px-20 flex justify-center items-center gap-3 ">

        <div className=" border-white border-[2px] md:w-2/3 w-[90%]  shadow-xl rounded-2xl bg-white/20 p-6">
          <div className="text-2xl font-semibold   flex items-center justify-center text-white bg-blue-700/70 p-4">Log in</div>

          <TextInput value={data.username} onChange={handleChange} name="username" error={formError.username} withAsterisk leftSection={icon} label="Username" placeholder="Your username" />
          <PasswordInput value={data.password} onChange={handleChange} name="password" error={formError.password} withAsterisk leftSection={iconn} label="Password" placeholder="Password" />

          <div className="mt-4 bg-blueRibbon-600">
            <Button autoContrast fullWidth variant="filled" color="rgba(30 80 207)" loading={loading} onClick={handleSubmit}>Sign in</Button>
          </div>
          <div className="mx-auto mt-2">Don't have an account ?<span className="text-blueRibbon-900 hover:underline cursor-pointer ml-3" onClick={() => { navigate("/signup"); setFormError(form); setData(form) }}>Sign Up</span></div>

          <div onClick={open} className="text-blueRibbon-950 hover:underline cursor-pointer text-center mt-5"> Forgot Password ?</div>
        </div>

      </div>
      <ResetPassword opened={opened} close={close} />
    </>
  )
}

export default Login
