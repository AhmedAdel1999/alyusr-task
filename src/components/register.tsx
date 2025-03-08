import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "./queryclientwrapper";
import Spinner from 'react-bootstrap/Spinner';
import { Formik, Form, Field , ErrorMessage } from 'formik';
import { useNavigate, useParams } from "react-router-dom";
import ErrorMsg from "./errormsg";
import SuccessMsg from "./successmsg";
import axios from "axios";
import * as Yup from "yup";


type User={
    Result:{
        User_Name:string,
        Name:string,
        Name_En:string,
        IsAdmin:boolean,
        rowState:number,
        ID:number,
    }
}

const Register = () => {

    const navigate = useNavigate()
    const {id} = useParams()

    //get user
    const {data:currentUser,isFetching:loaduser}=useQuery<User>({
        queryKey:['getUser'],
        queryFn:async()=>{
            const res=await axios.get(`https://alyusrmobileapi.alyusrsoft.com/GetUserById?userId=${id}`)
            return res.data

        },
        enabled:!!id,
    })

    //add user
    const {mutate:addUser,isPending,isError,error,isSuccess}=useMutation({
        mutationFn:async(values:any)=>{
            const res=await axios.post("https://alyusrmobileapi.alyusrsoft.com/SaveUser",values)
            return res.data
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ['getAllusers'] })
            setTimeout(() => {
                navigate("/users")
            }, 1500);
        },
        onError:(error:any)=>{
            // console.log(error.response.data.Message)
        }
    })


 //submit user
  const onSubmit = async (values:any)=>{
    if(currentUser){
        addUser({...values,ID:currentUser.Result.ID})
    }else{
        addUser(values)
    }
  }

  //validation schema
  const schema = () =>{
    const schema = Yup.object().shape({
      Password:Yup.string().min(6, 'Too Short!').required("مطلوب*"),
      User_Name:Yup.string().required("مطلوب*"),
      Name_En:Yup.string().required("مطلوب*"),
      Name:Yup.string().required("مطلوب*"),
    })
    return schema
  }

  return (
    <div className="flex flex-col gap-4">
        <div className="py-4 px-10 bg-[#060625] text-white text-lg">بيانات مستخدم</div>
        <div>
          {isError&& <ErrorMsg ErrMsg={error} />}
          {isSuccess&& <SuccessMsg SuccessMsg={`User ${currentUser?"Edited":"Created"} Successfully`}/>}
        </div>

        {
            loaduser?
                <div className="flex justify-center items-center h-[50vh]">
                    <Spinner animation="border" variant="primary" />
                </div>
                :
            <Formik 
                initialValues={{
                    User_Name:currentUser?.Result.User_Name||"",
                    Name:currentUser?.Result.Name||"",
                    Name_En:currentUser?.Result.Name_En||"",
                    Password:"",
                    IsAdmin:currentUser?.Result.IsAdmin || false,
                    rowState:currentUser?2:1
                }}
                onSubmit={onSubmit}
                validationSchema={schema}
                >
                <Form>
                    <div className="p-4 px-10 grid grid-cols-3 gap-8">
                        <div className="flex gap-4">
                            <label>اسم المستخدم:</label>
                            <div className="flex flex-col gap-0.5 grow">
                                <Field 
                                    type="text"
                                    name="User_Name" 
                                    placeholder="User Name" 
                                    className="input-field"
                                />
                                <ErrorMessage
                                    name="User_Name" 
                                    className="text-red-600" 
                                    component="span" 
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <label>كلمة المرور:</label>
                            <div className="flex flex-col gap-0.5 grow">
                                <Field
                                    type="text" 
                                    name="Password" 
                                    placeholder="Password" 
                                    className="input-field"
                                />
                                <ErrorMessage
                                    name="Password" 
                                    className="text-red-600" 
                                    component="span" 
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <label>الاسم بالعربي:</label>
                            <div className="flex flex-col gap-0.5 grow">
                                <Field 
                                    type="text" 
                                    name="Name" 
                                    placeholder="Arabic Name" 
                                    className="input-field"
                                />
                                <ErrorMessage
                                    name="Name"
                                    className="text-red-600" 
                                    component="span" 
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <label>الاسم الاجنبي:</label>
                            <div className="flex flex-col gap-0.5 grow">
                                <Field 
                                    type="text" 
                                    name="Name_En" 
                                    placeholder="English Name" 
                                    className="input-field"
                                />
                                <ErrorMessage
                                    name="Name_En" 
                                    component="span" 
                                    className="text-red-600" 
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">
                            <label>مدير نظام:</label>
                            <Field 
                                type="checkbox" 
                                name="IsAdmin"
                                className="w-4 h-4" 
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-6 px-10">
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white flex items-center gap-2 py-2 px-6 rounded-md"
                    >
                        <span>حفظ</span>
                        {
                            isPending&&
                            <Spinner animation="border" size="sm" />
                            
                        }
                    </button>
                    <button type="reset" className="bg-red-500 text-white py-2 px-6 rounded-md">إلغاء</button>
                    </div>
                </Form>
            </Formik>
        }
    </div>
  );
}

export default Register;
