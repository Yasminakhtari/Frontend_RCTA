const signupValidation=(name:string,value:string)=>{
    switch(name){
        
        case "firstName":
            if(value.length === 0)return "First name is required";
            return "";
        case "lastName":
            if(value.length === 0)return "First name is required";
            return "";
        case "username":
            if(value.length === 0)return "username is required";
            return "";
        case "email":
            if(value.length === 0)return "Email is required";
                if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
                return "Email is invalid";
        return "";

        case "password":
            if(value.length === 0)return "Password is required";
                if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value))
                    return "Password must be 8-15 charcters with an uppercase,a lowercase, a number and a special charcter.";
            return "";
        default:
            return "";
    }
}

const LoginValidation = (name:string,value:string)=>{
    switch(name){
        case "username":
            if(value.length === 0)return "username is required";
               
             return "";

        case "password":
            if(value.length === 0)return "password is required";
            return "";
        default:
            return "";

    }
}
export {signupValidation,LoginValidation};