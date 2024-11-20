import { Anchor, Button, Checkbox, PasswordInput, rem, TextInput } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";



const SignUp = () => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null); // Store the reCAPTCHA token

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token); // Save the token
    setCaptchaVerified(!!token); // Set the verification flag
  };

  const handleSubmit = async () => {
    if (!captchaVerified || !captchaToken) {
      alert("Please complete CAPTCHA verification.");
      return;
    }

    try {
      const response = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: captchaToken }),
      });

      if (response.ok) {
        alert("CAPTCHA verified successfully! Proceeding with signup...");
        // Proceed with signup logic
      } else {
        alert("CAPTCHA verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during CAPTCHA verification:", error);
    }
  };
  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const iconn = <IconLock style={{ width: rem(16), height: rem(16) }} />;
  return (
    <div className="w-1/2 px-20 flex flex-col justify-center items-center gap-3">

      <div className="border-white border-[2px] w-2/3 shadow-xl rounded-2xl bg-white/20 p-6 ">
           <div className='text-2xl font-semibold font-["poppins"] text-white bg-blue-700/70 p-4 flex items-center justify-center'>Create Account</div>

          <div className="flex gap-2 ">
            <TextInput className="w-1/2" withAsterisk label="First Name"   placeholder="First Name" />
            <TextInput  className="w-1/2" withAsterisk label="Last Name"   placeholder="Last Name" />
          </div>
          <TextInput  withAsterisk label="User Name"   placeholder="username" />
          <TextInput withAsterisk  leftSection={icon} label="Email"   placeholder="Your email" />
          <PasswordInput  withAsterisk leftSection={iconn}  label="Password"  placeholder="Password"/>
          <PasswordInput  withAsterisk leftSection={iconn}  label="Confirm password"  placeholder="Confirm password"/>
          <div className="my-2 ">
            <Checkbox autoContrast color="rgba(10, 10, 61, 1)" label={<>I accept {' '}<Anchor
                variant="gradient"
                gradient={{ from: '#020517', to: '#1d2a89' }}
              fw={500}
              fz="lg"
              href="#text-props">terms and conditions</Anchor></>}/> 
          </div>

         {/* CAPTCHA Section */}
        <div className="my-4 flex flex-col items-center">
          <ReCAPTCHA
            sitekey="your-site-key-here" // Replace with your site key
            onChange={handleCaptchaChange}
          />
          {!captchaVerified && <span className="text-red-500 text-sm">Please verify the CAPTCHA</span>}
        </div>


          <div className="mt-4 bg-blueRibbon-600">
            <Button autoContrast fullWidth variant="filled" color="rgba(30 80 207)" disabled={!captchaVerified} onClick={handleSubmit}>SignUp</Button>
          </div>
          <div className="mx-auto">Have an account ?<Link to="/login" className="text-blueRibbon-900 hover:underline">Login</Link></div>
      </div>
    </div>
  )
}

export default SignUp
