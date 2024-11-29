import { Button, Modal, PinInput, rem, TextInput } from "@mantine/core"
import { IconAt } from "@tabler/icons-react";
import { useState } from "react";
import { sendOtp, verifyOtp } from "../../Services/UserService";

const ResetPassword = (props:any) => {
  const [email,setEmail] = useState("");
  const [otpSent,setOtpSent]=useState(false);
  const [otpSending,setOtpSending] = useState(false);
  ////////////////
  const handleSendOtp = () => {
    setOtpSending(true);
    sendOtp(email).then((res)=>{
      console.log(res);
      setOtpSent(true);
      setOtpSending(false);
    }).catch((err)=>{
      console.log(err);
      setOtpSending(false);
    })
  }
  /////////////////////////
  const handleVerifyOtp = (otp:string) => {
      verifyOtp(email,otp).then((res)=>{
        console.log(res);
      })
      console.log(otp);
      //setOtpSent(false);
  }
  ////////
  const resendOtp = () =>{

  }
   ////
   const changeEmail = ()=>{
  setOtpSent(false);//i keep this function false here because while i click on resend otp and change email then otpSent will be automatically false as a result the component dissaper
  }

  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  return (
    <div>
      <Modal opened={props.opened} onClose={props.close} title="Reset Password" centered>
        <div>
          <TextInput value={email} size="md" onChange={(e)=>setEmail(e.target.value)} name="email" withAsterisk  leftSection={icon} label="Email"   placeholder="Your email" 
                  rightSection={<Button  disabled={email === "" || otpSent} loading={otpSending} size="xs" className="mr-1 " onClick={handleSendOtp} autoContrast variant="filled">Send OTP</Button> } rightSectionWidth="xl"
          />
          {otpSent && <PinInput onComplete={handleVerifyOtp}  length={6} className="mx-auto" size="md" gap="lg" type="number" /> }
            {otpSent && 
              <div className="flex gap-2">
                <Button fullWidth loading={otpSending}  color="brightSun.4" onClick={resendOtp} autoContrast variant="ligyht">Resend</Button>
                <Button fullWidth loading={otpSending}  onClick={changeEmail} autoContrast variant="filled">Change Email</Button>
              </div>
            }
        </div>
      </Modal>
    </div>
  )
}

export default ResetPassword
