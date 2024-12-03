import { Button, Modal, PasswordInput, PinInput, rem, TextInput } from "@mantine/core"
import { IconAt , IconLock } from "@tabler/icons-react";
import { useState } from "react";
import {  changePass, sendOtp, verifyOtp} from "../../Services/UserService";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useInterval } from "@mantine/hooks";
import { signupValidation } from "../../Services/FormValidation";

const ResetPassword = (props:any) => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [passErr,setPassErr] = useState("");
  const [otpSent,setOtpSent]=useState(false);
  const [otpSending,setOtpSending] = useState(false);
  const [verified,setVerified] = useState(false);
  const [resendLoader,setResendLoader] = useState(false);

  ///iterval hooks from mantine
  const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => {
    if(seconds === 0){
      setResendLoader(false);
      setSeconds(60);
      interval.stop();
    }else
    setSeconds((s) => s - 1)
  }, 1000);

  ////////////////
  const handleSendOtp = () => {
    setOtpSending(true);
    sendOtp(email).then((res)=>{
      console.log(res);
      setOtpSent(true);
      setOtpSending(false);
      //when my otp send sucessfully then resendloader true karibi
      setResendLoader(true);
      interval.start();
    }).catch((err)=>{
      console.log(err);
      errorNotification("OTP sending failed",err.response.data.errorMessage)
           setOtpSending(false);//otp send r jadi error asuchi
          })
  }
  /////////////////////////
  const handleVerifyOtp = (otp:string) => {
      verifyOtp(email,otp).then((res)=>{
        console.log(res);  
        successNotification("OTP verified","Enter new Password to reset.")
        setVerified(true);
      })
      .catch((err) => {
        console.log(err);
        errorNotification("OTP verification failed",err.response.data.errorMessage);
      })
  }
  ////////
  const resendOtp = () =>{
    if(resendLoader)return;//jadi resendLoader calichi then return karidia ,,kichi bi sendotp karani  resendloader  r click kale
    handleSendOtp();
  }
   ////
   const changeEmail = ()=>{
        setOtpSent(false);//i keep this function false here because while i click on resend otp and change email then otpSent will be automatically false as a result the component dissaper
        setResendLoader(false);
        setSeconds(60);
        setVerified(false);
        interval.stop();
    }

    ///
    const handleResetPassword = () => {
      changePass(email,password).then((res)=>{
        console.log(res);
        successNotification("Password Changed","Login with new password.")
        props.close();//to close the modal
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Password Reset Failed",err.response.data.errorMessage);
      })
    }

  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const iconn = <IconLock style={{ width: rem(16), height: rem(16) }} />;
  return (
    <div>
      <Modal opened={props.opened} onClose={props.close} title="Reset Password" centered>
        <div>
          <TextInput value={email} size="md" onChange={(e)=>setEmail(e.target.value)} name="email" withAsterisk  leftSection={icon} label="Email"   placeholder="Your email" 
                  rightSection={<Button  disabled={email === "" || otpSent} loading={otpSending && !otpSent} size="xs" className="mr-1 " onClick={handleSendOtp} autoContrast variant="filled">Log In</Button> } rightSectionWidth="xl"
          />
          
            {/* {otpSent && 
              <div className="flex gap-2">
                <Button fullWidth loading={otpSending}  color="blueRibbon.9" onClick={resendOtp} autoContrast variant="ligyht">Resend</Button>
                <Button fullWidth loading={otpSending}  onClick={changeEmail} autoContrast variant="filled">Change Email</Button> */}

                {otpSent && <PinInput onComplete={handleVerifyOtp}  length={6} className="mx-auto" size="md" gap="lg" type="number" /> }
                {otpSent && !verified &&
                  <div className="flex gap-2">
                    <Button fullWidth loading={otpSending}  color="blueRibbon.9" onClick={resendOtp} autoContrast variant="light">{resendLoader?seconds:"Resend"}</Button>
                    <Button fullWidth loading={otpSending}  onClick={changeEmail} autoContrast variant="filled">Change Email</Button>
                  </div>
                }
                {
                  verified && <PasswordInput value={password}  onChange={(e)=>{setPassword(e.target.value);setPassErr(signupValidation("password",e.target.value))}} name="password" error={passErr}  withAsterisk leftSection={iconn}  label="Password"  placeholder="Password"/> 
                }
                {
                  verified &&  <Button onClick={handleResetPassword} autoContrast variant="filled">Change Password</Button>
                }
                  {/* </div>
                } */}
        </div>
      </Modal>
    </div>
  )
}

export default ResetPassword
