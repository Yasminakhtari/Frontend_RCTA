import { Anchor, Button,  PasswordInput, rem, TextInput } from "@mantine/core"
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { registerUser } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { notifications } from "@mantine/notifications";

const form={
  firstName:"",
  lastName:"",
  username:"",
  email:"",
  password:"",
  // confirmPassword:"",
  // accountType:"USER"
}


const SignUp = (props:any) => {
  const [value, setValue] = useState('react');
  const [data,setData] = useState<{[key:string]:string}>(form);
  const [formError,setFormError] = useState<{[key:string]:string}>(form);
  const navigate = useNavigate();

  // CAPTCHA STATE
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null); // Store the reCAPTCHA token

//
  const handleChange=(event:any)=>{
   
    if(typeof(event)==="string"){
      setData({...data,accountType:event});
      return;
    }
    let name = event.target.name;
    let value = event.target.value;

    setData({...data,[name]:value});
    //after setup my Data i will send form error
    setFormError({...formError,[name]:signupValidation(name,value)})


    if(name === "password" && data.confirmPassword !==""){
      let err="";
      if(data.confirmPassword !== value){
        err = "Passwords don't match";
        //setFormError({...formError,confirmPassword:"password do not match"});//here i written confirmPassword instead of [name] because i have to written them on confirm password😊
        setFormError({...formError,[name]:signupValidation(name,value),confirmPassword:err})
      }else{
        setFormError({...formError,confirmPassword:""})
        
      }
    }

    if(name ==="confirmPassword"){
      if(data.password !== value){//Here value is value = event.target.value(confirmpassword)
          setFormError({...formError,[name]:"password do not match."})//here value is password don't match 
      }
      else{
        setFormError({...formError,confirmPassword:""})
      }
    }
  }
  /////////////////////////////////////
  /////////////////////////////////////
  const handleCaptchaChange = (token: string | null) => {
    if(token){
      setCaptchaToken(token)
     return setCaptchaVerified(true);
    }
    if(!token)
     setCaptchaVerified(false); 
  
  };
  // console.log(captchaToken)
  // console.log(captchaVerified)

  ////////////////////////////////////////////////////
  //////////////////////////////////////////////////

  const handleSubmit = async () => {
    if (!captchaVerified || !captchaToken) {
      alert("Please complete CAPTCHA verification.");
      return;
    }

//     try {
//       const response = await fetch(`${base_url}verify-captcha`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token: captchaToken }),
//       });
// console.log(response)
//       if (response.ok) {
//         alert("CAPTCHA verified successfully! Proceeding with signup...");
//         // Proceed with signup logic
//       } else {
//         alert("CAPTCHA verification failed. Please try again.");
//         return; // Prevent proceeding if CAPTCHA is not verified
//       }
//     } catch (error) {
//       console.error("Error during CAPTCHA verification:", error);
//       return; // Prevent proceeding if CAPTCHA verification fails
//     }

        ///////////////////////////////////////////////////
        /////////////////////////////////////////////////

        //For Empty request we have to through error 
        // let valid = true , newFormError = {}
          let valid = true ;
          let newFormError:{[key:string]:string} = {};//athi ame data pass karunahanti ,tara type define kara heuchi //key ku String au value r type ku bi string niaheichi
          
          //////////////////////////////////////////////
          for(let key in data){
            // console.log(" okkkkkkkkkkkkkkkkkkkkkkk" + key); 
            // if(key === "accountType"){
            //   continue;
            // }
      
            if(key !== "confirmPassword"){
              newFormError[key] = signupValidation(key,data[key]);//data[key] meaning it's value 
            }
            else if(data[key] !== data["password"]){
              newFormError[key]="Passwords do not match";//here data[key] oviously will be confirmPassword because we applied this on else if block
            }
      
            if(newFormError[key]){
              valid = false;
            }
          }
          setFormError(newFormError);

          /////////////////////////////////////////////

            if(valid === true){//jadi valid false then request send karani
              let newdata={...data,roleId: 1,}
              registerUser(newdata)
              .then((res)=>{
                setData(form);//After registration to clear the form
                console.log("0000000000000000" + res);
                notifications.show({
                  title: 'Registered Sucessfully',
                  message: 'Redirecting to Login Page...',
                  withCloseButton:true,
                  icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
                  color:"teal",
                  withBorder:true,
                  className:"!border-green-500"
                })
                setTimeout(()=>{
                  navigate("/login");
                },4000)
              }).catch((err)=>
                {
                  console.log(err);
                  notifications.show({
                    title: 'Registration Failed',
                    message: err.response.data.errorMessage,
                    withCloseButton:true,
                    icon:<IconX style={{width:"90%",height:"90%"}}/>,
                    color:"red",
                    withBorder:true,
                    className:"!border-red-500"
                  })
                });
            }    
   };


  ////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  
  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const iconn = <IconLock style={{ width: rem(16), height: rem(16) }} />;
  return (
    <div className=" w-[95%] md:w-1/2 md:px-20 flex flex-col pt-2  md:pt-10 items-center gap-3">

      <div className="border-white border-[2px] w-[90%] md:w-2/3 shadow-xl rounded-2xl bg-white/20 p-6 ">
           <div className='md:text-2xl font-semibold font-["poppins"] text-white bg-blue-700/70 md:p-4  p-2 flex items-center justify-center'>Create Account</div>

          <div className="flex gap-2 ">
            <TextInput value={data.firstName} onChange={handleChange} name="firstName" error={formError.firstName}  className="w-1/2 h-3" withAsterisk label="First Name"   placeholder="First Name" />
            <TextInput value={data.lastName} onChange={handleChange} name="lastName" error={formError.lastName} className="w-1/2" withAsterisk label="Last Name"   placeholder="Last Name" />
          </div>
          <TextInput value={data.username} onChange={handleChange} name="username" error={formError.username} withAsterisk label="User Name"   placeholder="username" />
          <TextInput value={data.email} onChange={handleChange} name="email" error={formError.email} withAsterisk  leftSection={icon} label="Email"   placeholder="Your email" />
          <PasswordInput value={data.password} onChange={handleChange} name="password"  error={formError.password}  withAsterisk leftSection={iconn}  label="Password"  placeholder="Password"/>
          {/* <PasswordInput value={data.confirmPassword} onChange={handleChange} name="confirmPassword" error={formError.confirmPassword}  withAsterisk leftSection={iconn}  label="Confirm password"  placeholder="Confirm password"/> */}
          {/* <div className="my-2 ">
            <Checkbox autoContrast color="rgba(10, 10, 61, 1)" label={<>I accept {' '}<Anchor
                variant="gradient"
                gradient={{ from: '#020517', to: '#1d2a89' }}
              fw={500}
              fz="lg"
              href="#text-props">terms and conditions</Anchor></>}/> 
          </div> */}

         {/* CAPTCHA Section */}
        <div className="my-4 pl-7 md:pl-0 flex  flex-col items-center justify-center">
          <ReCAPTCHA 
            sitekey="6Lf_TIoqAAAAAAXYolwSahryD09PcdLptCEnQaQH"
            onChange={(captchaTok)=>handleCaptchaChange(captchaTok)}
        />
          {!captchaVerified && <span className="text-red-500 text-sm">Please verify the CAPTCHA</span>}
        </div>


          <div className="mt-4 bg-blueRibbon-600">
            <Button autoContrast fullWidth variant="filled" color="rgba(30 80 207)" disabled={!captchaVerified} onClick={handleSubmit}>Sign Up</Button>
          </div>
          <div className="mx-auto mt-2 ">Have an account ?<span className="text-blueRibbon-900 hover:underline cursor-pointer ml-3" onClick={()=>{navigate("/login");setFormError(form);setData(form)}}>Sign-In</span></div>
      </div>
    </div>
  )
}


export default SignUp
