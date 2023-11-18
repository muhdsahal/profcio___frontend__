// import { Card,Input,Button,Typography } from "@material-tailwind/react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import toast,{ Toaster } from "react-hot-toast";
import { UserLoginURL } from "../../constants/constants"; 

import Loader from "../Loading/Loading";
import { userGoogleLogin } from "../../services/userApis";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";

export function EmployeeLogin(){
    const navigate = useNavigate();
    const [user,setUser] = useState({email:"",password:""});

    const handleForgotPassword = () =>{
        const dataToSend = {email:user?.email};
        navigate('/forgot_password',{state:{data:dataToSend}});
    };
    //for loading 
    const [loading,setLoading] = useState(false);
    const handleLoading = () =>setLoading((cur)=>!cur);


    //google Login handler
    const [guser,setgUser] = useState();

    // const login = useGoogleLogin({
    //     onSuccess :(codeResponse) => setgUser(codeResponse),
    //     oneError:(error) =>console.log("Login faild:",error),
    // });

    useEffect(()=>{
        const log = async () =>{
            try{
                if(guser){
                handleLoading();
                const res = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`,
                {
                    headers : {
                        Authorization: `Bearer ${guser.access_token}`,
                        Accept : "application/json",
                    },
                }
                )
                const response = await userGoogleLogin(res.data);

                const token = JSON.stringify(response.data);

                localStorage.setItem("token",token);

                handleLoading();
                toast.success("Signed with Google..!")
                navigate("/employee");
            }
        }catch(err){
            handleLoading();
            console.log(err);
            if (err.response.data){
                toast.error(err.response.data.email[0])
            }else{
                toast.error("Google verification failed")
            }
        }
    };
    log(); //call the funtion
    },[guser]);


    //email validation
    const validEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };
    
    //form valiadation
    const validForm = () =>{
        if(user.email.trim()==""){
            toast.error("Email should not be blank..")
            return false
        }else if(!validEmail(user.email.trim())){
            toast.error("enter valid email id")
            return false
        }else if(user.password.trim()==""){
            toast.error("password should be filled");
            return false
        }
        return true;
    };

// Assuming validForm() is a function that checks form validity
    const handleLogin = async (e) => {
      if (validForm()) {
          handleLoading();

          try {
              const response = await axios.post(UserLoginURL, user);
              const token = JSON.stringify(response.data);
              const decoded = jwtDecode(token);
              toast.success(`Welcome ${decoded.first_name}....!!`);
              localStorage.setItem("token", token);

              if (decoded.is_admin) {
                  navigate("/admin");
              } else {
                  navigate("/employee");
              }
          } catch (error) {
              if (error.response && error.response.data.detail) {
                  toast.error(error.response.data.detail);
              } else {
                  toast.error("An Error occurred, please try again");
              }
          } finally {
              handleLoading();
          }
      }
    };

    return (
    <div className="flex items-center justify-center h-screen">
      {loading && <Loader />}
      <Card className="w-96">
        <CardHeader 
        variant="gradient" 
        color="gray" 
        className="mb-4 grid h-28 place-items-center"  >
          
          
          
       
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
        <Input
              size="lg"
              label="Email"
              name="email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
            />
          <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
            />
          {/* <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div> */}
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={(e)=> handleLogin()}>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="212121"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
      <Toaster/>
      </div>
    );
} 
