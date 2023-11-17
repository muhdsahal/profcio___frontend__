import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {Card,
    Input,
    Checkbox,
    Button,
    Typography } from "@material-tailwind/react";

import {userRegisterURL} from '../../constants/constants'
import Loader from '../Loading/Loading'

export function SimpleRegistrationForm(){
    const navigate =useNavigate()

    const [other,setOther] = useState({conf_Password:"",check:false});

    // form 
    const [formData,setFormData] =useState({
        first_name:"",
        last_name:"",
        username:"",
        email:"",
        password:"",
        is_employee:false
    });

    const [user,setUser] = useState([]);

    // for loading
    const [loding,setLoading] = useState(false);
    const handleLoading = () => setLoading((cur)=> !cur);

    //email validation Handler
    const validEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex .test(email)
    }

    //form data validation error
    const  validForm = (e) => {
        // if(formData.first_name.trim()==""){
        //     toast.error("first name not should be empty")
        //     return false;
        // }
        // else if (formData.last_name.trim()==""){
        //     toast.error("last name not should be empty")
        //     return false;
        // }

        // console.log(formData,'mmmmmmmmmmmmmmmm');

         if (formData.username.trim()===""){
            toast.error("username not should be empty")
            console.log('11111111111111111111111111111111111');
            return false;
        }
        
        else if (formData.email.trim()===""){
            toast.error("email not should be empty")
            console.log('11111111111111111111111111111111111');

            return false;
        }
        else if(!validEmail(formData.email.trim())){
            toast.error("enter valid email")
            console.log('11111111111111111111111111111111111');

            return false;
        }
        else if (formData.password.trim()===""){
            toast.error("password not should be empty")
            console.log('11111111111111111111111111111111111');

            return false;
        }
        else if (other.conf_Password.trim()==""){
            toast.error("please confirm password")
            console.log('11111111111111111111111111111111111');

            return false
        }
        else if(formData.password != other.conf_Password){
            toast.error("password mismatch !")
            console.log('11111111111111111111111111111111111');

            return false
        }
        // else if(!other.check){
        //     toast.error("please  agree T&C..!")
        //     console.log('11111111111111111111111111111111111',);

        //     return false
        // }
        console.log('mmmmmmmmmmmmmmmm');
        return true;
        
    }
        // form submit handler
        const handleSubmit = async(e) => {
          console.log('llllllllllllotttttttttttta');
          console.log(formData,'kkkkkkkkkkkkkkkkk');
            if (validForm()){
            handleLoading();
        try{
            const response = await axios.post(userRegisterURL,formData);
            toast.success("Registraion success..!")
            console.log(response.data,'dddddddddddddddddddddddddddddddddddddd');

        setFormData({
            // first_name:"",
            // last_name:"",
            username:"",
            email:"",
            password:"",
            is_employee:false
        })
        setOther({conf_Password:"",check:false})
        handleLoading();
        navigate("/confirm")
        }catch(error){
            
            handleLoading();
              if (error.response.data){
                console.log(error.response.data.email);
                if (error.response.data.email){
                    toast.error(error.response.data.email[0])
                }
                if (error.response.data.username){
                    toast.error(error.response.data.username[0])
                }
              }else{
                toast.error("An error occurred during registration..")
           
            }
          }
          console.log(formData,'rrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
        }
      }
      return (
        <div className="flex items-center justify-center h-screen">

        <Card className="text-center" color="transparent" shadow={false}>
         <Typography variant="h4" color="blue-gray">
           Sign Up
         </Typography>
         <Typography color="gray" className="mt-1 font-normal">
           Nice to meet you! Enter your details to register.
         </Typography>
         <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
           <div className="mb-1 flex flex-col gap-6">
             {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
               Your Name
             </Typography> */}
             {/* <Input
               size="lg"
               placeholder="Enter your first name"
               value={formData.first_name} name="first_name"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             /> */}
             <Input
               size="lg"
               placeholder="Enter your last username"
               value={formData.username} name="username"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
           <Input
               size="lg"
               placeholder="Enter your  email"
              
               value={formData.email} name="email"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
             <Input
               size="lg"
               placeholder="Enter your password"
              
               value={formData.password} name="password" type="password"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
             <Input
               size="lg"
               placeholder="Enter your confirm password"
              
               value={other.conf_Passwordpassword} name="conf_Password" type="password"
               onChange={(e)=>{setOther({...other,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
           </div>
           <Checkbox
           name = 'is_employee'
           onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.checked})}}
             label={
               <Typography
                 variant="small"
                 color="gray"
                 className="flex items-center font-normal"
               >
                 you are a Employee
                 <a
                   href="#"
                   className="font-medium transition-colors hover:text-gray-900"
                 >
                   &nbsp;
                 </a>
               </Typography>
             }
             containerProps={{ className: "-ml-2.5" }}
           />
           <Button className="mt-6" fullWidth
           onClick={(e)=>{handleSubmit()}}>
             signup
           </Button>
           <Typography color="gray" className="mt-4 text-center font-normal">
             Already have an account?{" "}
             <a href="#" className="font-medium text-gray-900">
               Sign In
             </a>
           </Typography>
         </form>
       </Card>
       </div>
     );


}